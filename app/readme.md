# Workshop App

[![Runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

Die Anwendung kann auch mit einer App getestet werden. Kinder finden es oft besonders toll, Apps im Gegensatz zu Webseiten zu programmieren, da sie durch die Entwicklung von Apps in der Lage sind, etwas zu erschaffen, das direkt auf einem mobilen Gerät oder Tablet ausgeführt werden kann. Das Gefühl, etwas zu erschaffen, das auf einem physischen Gerät ausgeführt werden kann und von anderen genutzt wird, gibt den Kindern ein Gefühl von Stolz und Selbstvertrauen in ihre Fähigkeiten. Diese Implementation ruft lediglich die Companion-Seite des Webservers auf. Allerdings ist dies für den Workshop völlig ausreichend.

## Konfiguration

Bevor die App benutzt werden kann, muss eine `network.json` Konfiguration eingerichtet werden. Dafür kannst du `network_template.json` kopieren und dann die URL anpassen. In dieser Datei wird die Adresse des Express-Servers festgelegt. Dies kann beispielsweise die Adresse des Docker-Containers sein. Wichtig dabei ist nur, dass der Server aus dem Netzwerk des Mo­bil­ge­rätes auch erreicht werden kann.

## App-Server starten

```sh
# Pakete herunterladen
$ pnpm install

# Anwendung im Entwicklungsmodus starten
$ pnpm start
```

## App benutzen

Um fortzufahren, installiere die [Expo Go App](https://expo.dev/client) auf dem Mobilgerät. Die App ist sowohl für Android als auch iOS verfügbar. Scanne anschließend einfach den QR-Code aus dem Terminal.

> **Information (Stand 30. März 2023):**
> 
> In der Expo Go App unter Android gibt es eine Schaltfläche zum direkten Scannen eines QR-Codes innerhalb der App. Unter iOS gibt es diese Option nicht und die Kamera-App muss verwendet werden, um den Code zu scannen. Sobald der QR-Code gescannt ist, kann er jedoch mit der Expo Go App geöffnet werden.
