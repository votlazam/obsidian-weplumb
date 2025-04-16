# obsidian-weplumb

Come Funziona Weplumb
Weplumb è un plugin per Obsidian che ti permette di trasformare i tuoi file Markdown in un sito web HTML e pubblicarlo gratuitamente su GitHub Pages . Ecco una panoramica completa del suo funzionamento:

1. Organizzazione dei File
Il plugin si basa su una struttura organizzata per gestire i tuoi file Markdown.

Cartella weplumb-site
Cosa è : Una cartella dedicata nel tuo vault di Obsidian.
Scopo : Contiene tutti i file Markdown (.md) che desideri convertire in pagine web.
Come crearla : Il plugin crea automaticamente la cartella weplumb-site se non esiste già.

2. Generazione del Sito Web
Il plugin converte i file Markdown in pagine HTML utilizzando un processo automatizzato.

Passaggi :
Selezione dei File :
Il plugin legge tutti i file Markdown dalla cartella weplumb-site.
Conversione in HTML :
Usa la libreria open source marked per convertire il contenuto Markdown in HTML.
Crea un template HTML standard per ogni pagina, includendo titoli, paragrafi, elenchi e altri elementi Markdown.
Output nella Cartella weplumb-output :
Il plugin genera automaticamente una cartella chiamata weplumb-output.
Ogni file Markdown viene convertito in un file HTML con lo stesso nome.

3. Pubblicazione su GitHub Pages
Dopo aver generato il sito web, puoi pubblicarlo direttamente su GitHub Pages .

Passaggi :
Configurazione del Repository GitHub :
Vai su Impostazioni > Weplumb .
Inserisci l'URL del tuo repository GitHub nel formato:
https://github.com/your-username/your-repo.git.
Pubblicazione Automatica :
Il plugin usa simple-git per caricare i file HTML generati nel repository GitHub.
I file vengono pubblicati sul branch principale (es. main) del repository.
Abilitazione di GitHub Pages :
Assicurati che GitHub Pages sia abilitato nel tuo repository:
Vai alle impostazioni del repository su GitHub.
Scorri fino alla sezione Pages .
Seleziona il branch main come sorgente.
Accesso al Sito :
Una volta pubblicato, il sito sarà disponibile all'indirizzo:
https://your-username.github.io/your-repo/.
4. Comandi Principali
Weplumb fornisce due comandi principali per semplificare il processo.

Genera il Sito (Generate Website)
Come usarlo : Premi Ctrl+P (o Cmd+P su macOS) e cerca "Generate Website".
Funzionalità :
Legge i file Markdown dalla cartella weplumb-site.
Converte i file in HTML e li salva nella cartella weplumb-output.
Pubblica il Sito (Publish Website)
Come usarlo : Premi Ctrl+P (o Cmd+P su macOS) e cerca "Publish Website".
Funzionalità :
Carica i file HTML dalla cartella weplumb-output nel repository GitHub configurato.
Aggiorna automaticamente il sito su GitHub Pages.
5. Personalizzazione
Puoi personalizzare il plugin per adattarlo alle tue esigenze.

Template HTML
Modifica il metodo generateHTML nel file site-generator.ts per cambiare il layout delle pagine HTML.
Ad esempio, puoi aggiungere CSS personalizzato o script JavaScript.
Stili CSS
Aggiungi un file styles.css per personalizzare l'aspetto dell'interfaccia utente del plugin.
6. Workflow Completo
Ecco un esempio di workflow completo per usare Weplumb:

Organizza i File :
Crea la cartella weplumb-site e aggiungi i tuoi file Markdown.
Genera il Sito :
Usa il comando Generate Website per convertire i file Markdown in HTML.
Configura GitHub :
Inserisci l'URL del tuo repository GitHub nelle impostazioni del plugin.
Pubblica il Sito :
Usa il comando Publish Website per caricare il sito su GitHub Pages.
Visita il Sito :
Apri il sito web pubblicato all'indirizzo fornito da GitHub Pages.
7. Requisiti
Per usare Weplumb, devi soddisfare i seguenti requisiti:

Obsidian : Versione 0.15.0 o successiva.
GitHub Account : Per ospitare il sito su GitHub Pages.
Git Installato : Richiesto per la pubblicazione del sito.
8. Vantaggi di Weplumb
Semplice da Usare : Converti i tuoi appunti in un sito web con pochi clic.
Gratuito : Usa GitHub Pages per ospitare il sito senza costi aggiuntivi.
Personalizzabile : Adatta il template HTML e gli stili CSS alle tue esigenze.
Automatizzato : Gestisci tutto direttamente da Obsidian senza dover uscire dall'applicazione.
