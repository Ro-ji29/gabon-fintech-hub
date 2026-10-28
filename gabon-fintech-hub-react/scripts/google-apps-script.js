/**
 * ============================================================================
 * GABON FINTECH HUB — SCRIPT GOOGLE APPS SCRIPT POUR GOOGLE SHEETS
 * ============================================================================
 * 
 * Ce script est à copier-coller dans votre Google Sheet (Extensions > Apps Script).
 * Il reçoit automatiquement les soumissions de formulaires depuis le site
 * et les range dans des onglets dédiés avec en-têtes et détection de doublons.
 *
 * ONGLETS CRÉÉS AUTOMATIQUEMENT :
 * - "Concours"    : Candidatures au grand concours FinTech (avec détection doublons email)
 * - "Adhésion"    : Demandes d'adhésion et candidatures de startups
 * - "Contact"     : Messages du formulaire de contact direct
 * - "Événements"  : Demandes d'inscription aux événements et sommet
 * - "Test"        : Soumissions de test (quand VITE_TEST_MODE=true)
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Aucune donnée reçue dans le corps de la requête."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var payload = JSON.parse(e.postData.contents);
    var formType = payload.formType || "contact";
    var dossierId = payload.dossierId || ("GFH-" + new Date().getTime());
    var submittedAt = payload.submittedAtFormatted || new Date().toLocaleString("fr-FR");
    var isTest = Boolean(payload.isTest);
    var data = payload.data || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Détermination de l'onglet cible
    var targetSheetName = "Contact";
    if (isTest) {
      targetSheetName = "Test";
    } else if (formType === "concours") {
      targetSheetName = "Concours";
    } else if (formType === "adhesion" || formType === "startups") {
      targetSheetName = "Adhésion";
    } else if (formType === "evenements") {
      targetSheetName = "Événements";
    }

    var sheet = getOrCreateSheet(ss, targetSheetName);
    var isDuplicate = false;

    // Détection de doublons pour le concours (sur l'adresse email)
    if (targetSheetName === "Concours") {
      var emailToCheck = (data.email || "").toString().trim().toLowerCase();
      if (emailToCheck.length > 0) {
        var lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          // Colonne 4 = Email
          var emailsRange = sheet.getRange(2, 4, lastRow - 1, 1).getValues();
          for (var i = 0; i < emailsRange.length; i++) {
            if (emailsRange[i][0].toString().trim().toLowerCase() === emailToCheck) {
              isDuplicate = true;
              break;
            }
          }
        }
      }
    }

    // Construction de la ligne de données selon l'onglet
    var rowData = [];

    if (targetSheetName === "Concours") {
      rowData = [
        submittedAt,
        dossierId,
        data.fullName || "",
        data.email || "",
        data.phone || "",
        data.city || "",
        data.projectOrStartupName || "",
        data.websiteOrLinkedIn || "",
        data.projectDescription || "",
        data.utmSource || data.source || "direct",
        isDuplicate ? "DOUBLON (déjà enregistré)" : "NOUVEAU",
        data.rulesAccepted ? "Accepté" : "Non",
        data.consent ? "Oui" : "Non"
      ];
    } else if (targetSheetName === "Adhésion") {
      rowData = [
        submittedAt,
        dossierId,
        data.category || data.stage || "Startup",
        data.name || data.contactName || "",
        data.organization || data.startupName || "",
        data.email || "",
        data.phone || "",
        data.city || "Libreville",
        data.websiteOrLinkedin || "",
        data.sector || "",
        data.mainNeed || "",
        data.message || data.description || "",
        data.utmSource || "direct"
      ];
    } else if (targetSheetName === "Événements") {
      rowData = [
        submittedAt,
        dossierId,
        data.name || "",
        data.email || "",
        data.phone || "",
        data.eventName || "Gabon FinTech Summit",
        data.subject || "Inscription",
        data.message || "",
        data.utmSource || "direct"
      ];
    } else if (targetSheetName === "Test") {
      rowData = [
        submittedAt,
        dossierId,
        formType,
        data.fullName || data.name || data.contactName || "",
        data.email || "",
        data.phone || "",
        JSON.stringify(data)
      ];
    } else {
      // Contact général
      rowData = [
        submittedAt,
        dossierId,
        data.name || "",
        data.email || "",
        data.phone || "",
        data.subject || "Contact général",
        data.message || ""
      ];
    }

    // Ajout effectif de la ligne dans la feuille
    sheet.appendRow(rowData);
    var newRowIndex = sheet.getLastRow();

    // Si c'est un doublon, surligner la ligne en jaune doux pour le gestionnaire
    if (isDuplicate) {
      sheet.getRange(newRowIndex, 1, 1, rowData.length).setBackground("#fef9c3");
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      row: newRowIndex,
      isDuplicate: isDuplicate,
      sheet: targetSheetName,
      dossierId: dossierId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Récupère ou crée automatiquement la feuille avec ses en-têtes stylisés.
 */
function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [];

    if (sheetName === "Concours") {
      headers = [
        "Date et Heure",
        "N° Dossier",
        "Nom et Prénom",
        "Email",
        "Téléphone",
        "Ville",
        "Nom Projet / Startup",
        "Site / LinkedIn",
        "Description du Projet",
        "Source (UTM)",
        "Statut Doublon",
        "Règlement",
        "Consentement"
      ];
    } else if (sheetName === "Adhésion") {
      headers = [
        "Date et Heure",
        "N° Dossier",
        "Catégorie / Formule",
        "Nom complet",
        "Organisation / Startup",
        "Email",
        "Téléphone",
        "Ville",
        "Site / LinkedIn",
        "Secteur",
        "Besoin principal",
        "Message / Présentation",
        "Source (UTM)"
      ];
    } else if (sheetName === "Événements") {
      headers = [
        "Date et Heure",
        "N° Dossier",
        "Nom complet",
        "Email",
        "Téléphone",
        "Événement",
        "Sujet",
        "Message",
        "Source (UTM)"
      ];
    } else if (sheetName === "Test") {
      headers = [
        "Date et Heure",
        "N° Dossier",
        "Type Formulaire",
        "Nom",
        "Email",
        "Téléphone",
        "Données Brutes (JSON)"
      ];
    } else {
      headers = [
        "Date et Heure",
        "N° Dossier",
        "Nom complet",
        "Email",
        "Téléphone",
        "Sujet",
        "Message"
      ];
    }

    sheet.appendRow(headers);

    // Style professionnel des en-têtes (Bleu nuit GFH, texte blanc gras)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0d2347");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);

    // Ajustement de la largeur des colonnes
    for (var col = 1; col <= headers.length; col++) {
      sheet.autoResizeColumn(col);
    }
  }
  return sheet;
}

