import {test,expect} from '@playwright/test';
test('contract, payroll, collection, next month and persistence',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Sözleşmeyi kabul et'}).click();
 await page.locator('aside').getByRole('button',{name:'Bordro Hazırla'}).click();
 for(let i=0;i<3;i++)await page.locator('.steps button:not(:disabled)').click();
 await expect(page.locator('.metrics')).toContainText('5.600');await expect(page.locator('.status')).toContainText('Tamamlandı');
 await page.getByRole('button',{name:'Sonraki aya geç'}).click();await page.getByRole('button',{name:'Kaydet',exact:true}).click();
 await page.reload();await expect(page.locator('.metrics')).toContainText('2. ay');await expect(page.locator('.metrics')).toContainText('5.600');
 await page.getByRole('button',{name:'Yükle',exact:true}).click();await expect(page.getByRole('status')).toContainText('Kayıt yüklendi');
 await expect(page.locator('canvas')).toBeVisible();await page.waitForTimeout(700);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`docs/screenshots/${info.project.name}.png`,fullPage:true});expect(errors).toEqual([]);
 page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Yeni oyun'}).click();await expect(page.locator('.metrics')).toContainText('5.600');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Yeni oyun'}).click();await expect(page.locator('.metrics')).toContainText('5.000');
});
