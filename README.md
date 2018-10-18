# Evrak İşim (MyPaperWork) Project - (Pisano Hackathon 2018)

**Evrakİşim (MyPaperWork)** is an online crowdsourced search engine which allows users to know the steps required to retrieve some official document from start to end. It achieves this by storing a **graph of dependencies** of official documents, sorts them topologically and displays them to the user.

This is the frontend repository.

You can check out:

* [Presentation](https://docs.google.com/presentation/d/12jedio3jkONxd0SVQH2fkvceobrEd5LDO46W8LcFN-k/edit?usp=sharing)
* [Frontend demo video](https://drive.google.com/file/d/1ck1zcx2NM2Tnh3YjFEoO1MJELQpyq1n9/view?usp=sharing)
* [Mobile app demo video](https://drive.google.com/file/d/1lqmaA6zRynlv9Yb8g6lelesEL6HoKPXS/view?usp=sharing)

## Pisano Hackathon

* Details of the hackathon can be found in [Pisano Hackathon Website](https://hackathon.pisano.co/)
* If that link is broken or changed check it out from [Archive.is backup of Pisano Hackathon Website](http://archive.is/oVGiI)

## Exbibyte Team

4 developers:
* [Halit Ozsoy aka corupta](https://github.com/corupta) as React Native Developer
  * [Pisano Hackathon React Native Project](https://github.com/corupta/pisano-hackathon-react-native)
* [Mehdi Saffar](https://github.com/MehdiSaffar) as React Developer
  * [Pisano Hackathon Frontend](https://github.com/MehdiSaffar/pisano-hackathon__frontend)
* [Nazmican Çalık](https://github.com/nazmicancalik) as Express (Node.js) Developer
  * [Pisano Hackathon Backend](https://github.com/nazmicancalik/pisano-hackathon-backend)
* [Kemal Tulum](https://github.com/kemaltulum) as Project Coordinator/Designer, Angular Developer
  * [Pisano Hackathon Frontend for Adding Steps](https://github.com/kemaltulum/pisano-exbibyte-frontend)

## Workflow of App

Search for a document,
the app lists you how to get it step by step topologically sorted, considering other document dependencies.

You can navigate to other documents' pages and add & view comments to each document

## Example Workflow

In order to get a passport, you will need your citizenship card, deposit for paying passport fee, etc.
And to get deposit for paying passport, you will need your citizenship card, your photo, and some money.
And to get citizenship card, you need your photo.

In that case, when you search for how to get a passport.
Listed steps are:

1. Photo (Document)
2. Pay for citizenship card (Action)
3. Citizenship Card (Document)
4. Pay for passport fee (Action)
5. Deposit for Paying Passport Fee (Document)
6. Apply for passport (Action)
7. Passport (Document)

## Technical Details

The frontend was initially created with `create-react-app` then changed to include `CSS Modules`.
Uses `mobx` reactive state management framework.