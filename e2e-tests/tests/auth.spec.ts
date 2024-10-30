import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "Đăng nhập" }).click();

  await expect(page.getByRole("heading", { name: "Tìm kiếm nơi ở của bạn" })).toBeVisible({ timeout: 10000 });
  await page.locator("[name=email]").fill("chivihuynh3@gmail.com");
  await page.locator("[name=password]").fill("1234567");
  await page.getByRole("button", { name: "Đăng nhập" }).click();
  await expect(page.getByText("Đăng nhập thành công")).toBeVisible();
  await expect(page.getByRole("link", { name: "Đặt phòng của tôi" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Khách sạn của tôi" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Đăng xuất" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000
    }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Đăng nhập" }).click();
  await page.getByRole("link", { name: "Đăng ký tài khoản" }).click();
  await expect(
    page.getByRole("heading", { name: "Tạo tài khoản" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("1234567");
  await page.locator("[name=confirmPassword]").fill("1234567");

  await page.getByRole("button", { name: "Đăng ký" }).click();

  await expect(page.getByText("Đăng ký thành công")).toBeVisible();
  await expect(page.getByRole("link", { name: "Đặt phòng của tôi" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Khách sạn của tôi" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Đăng xuất" })).toBeVisible();
});


