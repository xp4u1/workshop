# Workshop

In diesem Workshop werdem die Grundlagen der Programmierlogik möglichst einfach und selbsterklärend vermittelt. Dabei wird bewusst keine „echte“ Programmiersprache verwendet, um einen einfacheren Zugang zum Programmieren zu ermöglichen.

*Diese Anwendung ist nicht dafür ausgelegt, sich Programmieren selbst beizubringen. Sie diehnt als Grundlage für den Workshop.*

## Apps

### Sequenz-Test

![Sequenz](./docs/sequence/preview.png)

Bei diesem Test soll das Gedächtnis trainiert werden. Das Ziel ist es, auf den neun Feldern eine zufällige Reihenfolge anzuzeigen, die der Benutzer dann eingeben muss. Dabei wird die Sequenz in jedem Schritt um eine Eingabe länger.

### Reaktionstest

![Reaktion](./docs/reaction/preview.png)

Bei diesem Test soll die Reaktion trainiert werden. Der Benutzer soll, sobald sich die Farbe des Textfelds ändert, auf dieses klicken. Es wird eine zufällige Anzahl von Sekunden gewartet und dann die Farbe geändert. Dabei wird dann die Zeit zwischen dem Klick und der Änderung der Farbe gemessen.

### Lösungen

Musterlösungen für die Apps sind im Verzeichnis `docs/` zu finden.

## Entwicklung

```sh
# Repo klonen
$ git clone git@github.com:xp4u1/workshop

# Pakete herunterladen
$ yarn

# Anwendung im Entwicklungsmodus starten
$ yarn start
```
