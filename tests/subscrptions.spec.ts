import {test, expect } from "@playwright/test";

test.describe('Subscriptions Page', () =>{
    //Abos Seite öffnen,bevor jede Test
    test.beforeEach(async({page}) => {
        await page.goto('/subscriptions');
        // ✅ warten, dass titel sehbar ist 
        await page.waitForSelector('text=Abonnements', { timeout: 10000 });
    });

    //Test 1 : Titel verifizieren und Hinzufügen Button auch
    test('should display the subscriptions page and the add button', async ({page}) => {
        //verifiziern, dass titel gut sehbar ist
        await expect(page.locator('text= Abonnements')).toBeVisible();

        //Verifizieren, dass add button enthaltet ist
        const addButton = page.locator('button:has-text("Ajouter")');
        await expect(addButton).toBeVisible();
    });
    
    //Test 2 : Öffnen AddDialog
    test('should open add subscription dialog', async({page}) => {
        //Über hinzufügen Button clicken
        await page.click('button:has-text("Ajouter")');
        await page.waitForSelector('text=New Subscription', { timeout: 5000 });
        //Verifizieren,dass Dialog sehbar ist
        await expect(page.locator('text= New Subscription')).toBeVisible();

        //Schließt den Dialog
        await page.click('button:has-text("Cancel")');
    });

    //Test 3 : Verifizieren, dass ein Tabelle dargestellt ist
    test('should show a table with datas', async({page}) => {
        const table = page.locator('table');
        
        // Attendre que le tableau soit visible
        await expect(table).toBeVisible();

        // Attendre que les lignes soient chargées
        await page.waitForFunction(() => {
        const rows = document.querySelectorAll('table tr');
        return rows.length > 1; // header + au moins 1 data
        }, null, {timeout: 8000});
        //await expect(page.locator('table')).toBeVisible();

        //Verifizieren, dass es mindestens eine Reihe gibt
        const rows = await table.locator('tr').count();
        expect(rows).toBeGreaterThan(1);//1 für header + mind. eine reihe
    });

    //Test 4 : Abo hinzufügen und verifizieren
    test('should add a new subscrption and display it in the table', async({page}) => {
        await page.goto('/subscriptions');
        await page.waitForSelector('button:has-text("Ajouter")');
        await page.click('button:has-text("Ajouter")');
        await page.waitForSelector('text= New Subscription');

        //Formular ausfüllen
        await page.fill('input[formControlName="name"]', 'Playwright Test');
        //await page.click('mat-select[formControlName="category"]');
        //await page.click('mat-option:has-text("Other")');
        await page.click('mat-select[formControlName="cycle"]');
        await page.waitForTimeout(200);
        await page.click('mat-option:has-text("Monthly")');
        await page.waitForTimeout(200);
        await page.fill('input[formControlName="price"]', '19.99');
        //await page.selectOption('mat-select[formControlName="status"]', { label: 'active'});
        await page.click('mat-select[formControlName="status"]');
        await page.waitForTimeout(200);
        await page.click('mat-option:has-text("active")');
        await page.waitForTimeout(200);
        // Speichern
        await page.click('button:has-text("Save")');

        // Warten update der tabelle
        await page.waitForTimeout(1500);
        await page.reload();

        // Fonction utilitaire pour chercher sur plusieurs pages
  async function findTextOnAnyPage(text: string) {
    for (let i = 0; i < 5; i++) {
      const found = await page.getByText(text).count();
      if (found > 0) return true;

      const next = page.locator('button[aria-label="Next page"]');
      if (await next.isEnabled()) {
        await next.click();
        await page.waitForTimeout(500);
      } else break;
    }
    return false;
  }

        
        const exists = await findTextOnAnyPage('Playwright Test');
        expect(exists).toBeTruthy();

        // 🧭An der erste seite zurückkommen wenn nötig
        //const paginatorPrev = page.locator('button[aria-label="Previous page"]');
        //if (await paginatorPrev.isEnabled()) {
        //await paginatorPrev.click();
        //}

        // Vérifie que la nouvelle ligne existe
        //await expect(page.getByText('Playwright Test')).toBeVisible({ timeout: 5000 });

    });

    //Test 5 : Abo löschen
    /*test('should delete a subscription', async ({page}) => {
        await page.goto('/subscriptions');
        await page.waitForSelector('table');
        //suchen die Reihe der letzten Test
        const row = page.locator('tr', { hasText: 'Playwright Test' });
        await expect(row).toBeVisible();

        //delete clicken
        await row.locator('button[matTooltip="Delete"]').click();
        //zustimmen oder confirm
        await page.click('button:has-text("OK")');
        //Bisschein warten
        await page.waitForTimeout(1000);
        //Verifizieren, dass die reihe nicht mehr da ist
        await expect(page.getByText('Playwright Test')).toBeHidden();
    });*/

    test.describe('Delete subscription flow', () => {
        test('should delete a subscription even if paginated', async ({ page }) => {
          await page.goto('/subscriptions');
      
          // Attendre que le tableau soit chargé
          await page.waitForSelector('table');
      
          // Fonction utilitaire → pour trouver un texte sur n'importe quelle page
          async function findRowByName(name: string) {
            for (let i = 0; i < 5; i++) {
              const row = page.locator('tr', { hasText: name });
              if (await row.count() > 0) return row;
      
              const nextBtn = page.locator('button[aria-label="Next page"]');
              if (await nextBtn.isEnabled()) {
                await nextBtn.click();
                await page.waitForTimeout(400);
              } else break;
            }
            return null;
          }
      
          // 🔍 Chercher la ligne à supprimer (ex: "Playwright Test")
          const targetName = 'Playwright Test';
          const targetRow = await findRowByName(targetName);
      
          if (!targetRow) {
            throw new Error(`❌ Subscription "${targetName}" not found on any page`);
          }
      
          // 🗑️ Cliquer sur le bouton Delete
          // 🗑️ Supprimer la ligne correspondante
          const deleteBtn = targetRow.locator('button[mattooltip="Delete"]');

          // 👉 Désactive le strict mode pour permettre plusieurs correspondances
          const count = await deleteBtn.count();
          console.log(`🧩 Boutons delete trouvés : ${count}`);
          if (count > 1) {
          await deleteBtn.nth(0).click({ force: true }); // clique sur le premier
          } else {
          await deleteBtn.click({ force: true });
          }


      
          // ✅ Le dialog de confirmation apparaît
const confirmDialog = page.locator('mat-dialog-container');
await expect(confirmDialog).toBeVisible({ timeout: 5000 });

// Clique sur le bon bouton Delete dans le dialog
const deleteConfirmBtn = confirmDialog.locator('button:has-text("Delete")');
await expect(deleteConfirmBtn).toBeVisible({ timeout: 3000 });
await deleteConfirmBtn.click({ force: true });

// Attendre que le dialog disparaisse
await expect(confirmDialog).toBeHidden({ timeout: 5000 });

// ✅ Vérifier que le snackbar de suppression apparaît
// ✅ Cible uniquement le texte du message, pas les boutons
// ✅ Cherche le snackbar dans l’overlay Angular Material
const snackbar = page.locator('.cdk-overlay-container simple-snack-bar');

// Attendre qu’il apparaisse
await expect(snackbar).toBeVisible({ timeout: 6000 });

// Vérifier le texte du message
const snackbarLabel = snackbar.locator('.mdc-snackbar__label');
await expect(snackbarLabel).toContainText(/Subscription deleted!/i, { timeout: 6000 });

// (Optionnel) attendre qu’il disparaisse ensuite
await snackbar.waitFor({ state: 'hidden', timeout: 7000 });




// Attendre la mise à jour de la table
await page.waitForTimeout(1000);
await page.reload();

        });
    });
});