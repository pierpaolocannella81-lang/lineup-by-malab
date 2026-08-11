# Guida: aggiornare LineUp by MALab per Mac

Questa guida serve per creare una nuova versione Mac dell'app dopo ogni modifica al progetto.

## Operazione da fare una sola volta

### 1. Apri il progetto su GitHub

Apri nel browser:

https://github.com/pierpaolocannella81-lang/lineup-by-malab

### 2. Crea il file che prepara l'app per Mac

1. Premi **Add file**.
2. Premi **Create new file**.
3. Nel nome del file scrivi esattamente:

   ```text
   .github/workflows/build-macos.yml
   ```

4. Copia nel riquadro grande questo testo:

   ```yaml
   name: Crea app macOS

   on:
     workflow_dispatch:
     push:
       tags:
         - "v*"

   jobs:
     build-macos:
       runs-on: macos-latest
       steps:
         - name: Scarica il progetto
           uses: actions/checkout@v4

         - name: Configura Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm

         - name: Installa le dipendenze
           run: npm ci

         - name: Crea app per Mac
           run: npm run mac

         - name: Conserva i file per Mac
           uses: actions/upload-artifact@v4
           with:
             name: LineUp-by-MALab-macOS
             path: |
               dist/*.dmg
               dist/*.zip
             if-no-files-found: error
   ```

5. Controlla che la prima riga sia esattamente `name: Crea app macOS`.
6. In basso scrivi come messaggio: `Aggiungi creazione app Mac`.
7. Premi **Commit changes**.
8. Apri la scheda **Actions**. Se GitHub lo richiede, attiva le Actions.

Da questo momento il pulsante **Crea app macOS** sarà sempre disponibile nella sezione Actions.

## Operazione da fare per ogni aggiornamento

### 1. Aggiorna il progetto su GitHub

Prima di creare l'app Mac, carica su GitHub tutti i file modificati del progetto.

Non caricare queste cartelle:

- `node_modules`
- `dist`

Carica invece i file del programma, per esempio `app.js`, `index.html`, i file `.css`, i file `.js`, `package.json` e la cartella `assets`.

Quando hai finito, premi **Commit changes**.

### 2. Crea la nuova app Mac

1. Apri il repository su GitHub.
2. Apri la scheda **Actions**.
3. Nella colonna sinistra premi **Crea app macOS**.
4. Premi **Run workflow**.
5. Nel menu che compare lascia selezionato il ramo `main`.
6. Premi di nuovo **Run workflow**.
7. Attendi alcuni minuti: il pallino giallo indica che il lavoro è in corso; il segno di spunta verde indica che è terminato.

### 3. Scarica il file per Mac

1. Premi sul lavoro concluso con il segno di spunta verde.
2. Scorri in basso fino alla sezione **Artifacts**.
3. Premi **LineUp-by-MALab-macOS** per scaricarlo.
4. Estrai il file ZIP scaricato.
5. Dentro troverai il file `.dmg` e, se presente, il file `.zip` dell'app.

### 4. Installa l'aggiornamento sul Mac

1. Copia il file `.dmg` sul Mac.
2. Apri il file `.dmg`.
3. Trascina **LineUp by MALab** nella cartella **Applicazioni**.
4. Quando macOS chiede se vuoi sostituire la vecchia versione, premi **Sostituisci**.
5. Apri l'app dalla cartella **Applicazioni**.

## Se il Mac blocca l'app

L'app non è firmata con un certificato Apple. Se macOS mostra un avviso:

1. Vai nella cartella **Applicazioni**.
2. Fai clic destro su **LineUp by MALab**.
3. Premi **Apri**.
4. Nella finestra di conferma premi di nuovo **Apri**.

Questa procedura va fatta normalmente solo la prima volta per ciascuna nuova versione.

## Controllo finale

Dopo l'installazione, apri l'app e verifica che in alto compaia la versione aggiornata. Se l'app non mostra le ultime modifiche, significa che i file aggiornati non erano ancora stati caricati su GitHub prima di avviare **Crea app macOS**.
