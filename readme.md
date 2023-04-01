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

### Wissensquiz

![Reaktion](./docs/quiz/preview.png)

Bei diesem Test soll auf beliebige Fragen geantwortet werden. Dabei kann man kleines Allgemeinwissensquiz erstellen oder ein Kopfrechentrainer erstellen.

### Lösungen

Musterlösungen für die Apps sind im Verzeichnis [`/docs`](./docs) zu finden.

## Entwicklung und Installation

### Quickstart

```sh
# Repo klonen
$ git clone git@github.com:xp4u1/workshop

# Pakete herunterladen
$ yarn

# Anwendung im Entwicklungsmodus starten
$ yarn start
```

### Build

```sh
# Build (production ready)
$ yarn build

# In Unterverzeichnis, z. B. "example.com/workshop"
$ yarn build --public-url "/workshop"
```

Nach dem Erstellen befindet sich der Build im Verzeichnis `/dist`. Die Dateien im `/dist/web` Verzeichnis können auch ohne den Express-Server ausgeführt werden. Wenn der Express-Server verwendet wird, kann man ein Test-Gerät hinzufügen, indem man `deine-url.com/companion.html` aufruft. Sobald der Anwender auf „Code ausführen“ klickt, wird der generierte Code an das Test-Gerät gesendet. Die Companion-Seite kann im Browser aufgerufen werden, aber es besteht auch die Möglichkeit, eine App zu verwenden. Weitere Informationen dazu findest du [hier](./app).

### Docker

```sh
# Image bauen
$ docker build -t workshop

# Container erstellen
$ docker run -it --name workshop --rm -p 3000:3000 workshop
```

Die Anwendung kann auch als Docker-Container ausgeführt werden. Der Vorteil dieser Methode ist, dass das Gerät, auf dem die Anwendung ausgeführt werden soll, keine Node-Installation benötigt. Docker-Container sind unabhängig von der zugrunde liegenden Infrastruktur und sorgen somit für eine höhere Portabilität der Anwendung. Mit dieser Methode kann die Anwendung auf allen Maschinen und Architekturen, die die Node-Alpine Images unterstützen, ausgeführt werden. Das bedeutet, dass die Anwendung problemlos auf verschiedenen Betriebssystemen oder Cloud-Plattformen ausgeführt werden kann, ohne dass zusätzliche Anpassungen notwendig sind.
