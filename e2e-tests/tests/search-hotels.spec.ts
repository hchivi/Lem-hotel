import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", { name: "Đăng nhập" }).click();

    await expect(page.getByRole("heading", { name: "Tìm kiếm nơi ở của bạn" })).toBeVisible();

    await page.locator("[name=email]").fill("chivihuynh3@gmail.com");
    await page.locator("[name=password]").fill("1234567");

    await page.getByRole("button", { name: "Đăng nhập" }).click();

    await expect(page.getByText("Đăng nhập thành công")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Bạn muốn đi đâu?").fill("TPHCM");
    await page.getByRole("button", { name: "Tìm kiếm" }).click();

    await expect(page.getByText("Khách sạn đã tìm thấy ở TPHCM")).toBeVisible();
    await expect(page.getByText("KS1")).toBeVisible();
});


