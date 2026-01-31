# Alethinos PWA (Mobile-first)

This is a mobile-first, app-like website (PWA) built to run on GitHub Pages.

## Pages
- index.html — home + info
- menu.html — menu with search + categories + add-to-cart
- cart.html — cart review (persistent)
- checkout.html — USSD-assisted payment + WhatsApp confirmation
- order.html — Express order + Future order templates (WhatsApp)

## How the basket works
- The basket is stored in LocalStorage on the customer's phone.
- Customers can add items, leave the page, come back later: the basket stays.

## Deploy on GitHub Pages
Upload these files to your repo root and enable GitHub Pages.


## Mode stratégie (Togo)
- Chemin par défaut : bouton WhatsApp par produit (simple, efficace).
- Panier + paiement USSD : gardés en option / phase 2.


## Structure globale (v3)
- Page 1: index.html (one-page principale)
- Page 2: evenementiel.html
- Page 3: contact.html
