import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get sign in btn
    await page.getByRole("link", { name: "Đăng nhập" }).click();

    await expect(page.getByRole("heading", { name: "Tìm kiếm nơi ở của bạn" })).toBeVisible();

    await page.locator("[name=email]").fill("chivihuynh3@gmail.com");
    await page.locator("[name=password]").fill("1234567");

    await page.getByRole("button", { name: "Đăng nhập" }).click();

    await expect(page.getByText("Đăng nhập thành công")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page
        .locator('[name="description"]')
        .fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Bình dân").click();

    await page.getByLabel("WiFi Miễn phí").check();
    await page.getByLabel("Bãi đậu xe").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
    ]);

    await page.getByRole("button", { name: "Lưu" }).click();
    await expect(page.getByText('Thêm khách sạn thành công')).toBeVisible({ timeout: 10000 });
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("KS1")).toBeVisible();
    await expect(page.getByText("123456")).toBeVisible();
    await expect(page.getByText("TPHCM, VN")).toBeVisible();
    await expect(page.getByText("Bình dân")).toBeVisible();
    await expect(page.getByText("1000000VND/đêm")).toBeVisible();
    await expect(page.getByText('2 người lớn, 1 trẻ em').first()).toBeVisible();
    await expect(page.getByText("3 Sao")).toBeVisible();

    await expect(
        page.getByRole("link", { name: "Xem chi tiết" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Thêm khách sạn" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await page.getByRole("link", { name: "Xem chi tiết" }).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue("KS1 UPDATED");
    await page.locator('[name="name"]').fill("KS1 UPDATED123");
    await page.getByRole("button", { name: "Lưu" }).click();
    await expect(page.getByText("Lưu thành công")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue(
        "KS1 UPDATED123"
    );
    await page.locator('[name="name"]').fill("KS1 UPDATED");
    await page.getByRole("button", { name: "Lưu" }).click();
});