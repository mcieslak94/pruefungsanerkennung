export function CreateTemplate (templateName, data) {
    let subject, body
    switch(templateName) {
        case 'missingDoc':
            subject = `mailto:${data.mail}?subject=Erinnerung: Anerkennung ihrer Prüfungsleistungen &`
            body = `body=Hallo ${data.gender} ${data.lastName},%0D%0A%0D%0AAm ${data.date} haben Sie einen Antrag auf Anerkennung von Prüfungsleistungen bei mir eingereicht.%0D%0ADabei fehlen noch folgende Dokumente bzw. sind nicht vollständig:%0D%0A${data.docs}%0D%0A%0D%0ABitte reichen Sie mir diese in den nächsten 7 Tagen nach. Ansonsten werde ich den Fall schließen.%0D%0A`
            return subject + body
        case 'sendToAllProfs':
            subject = `mailto:${data.mailString}?subject=Module anerkennen lassen &`
            body = `body=Hallo Kollegen,%0D%0A%0D%0AIch habe einen neuen Antrag auf Anerkennung von Prüfungsleistungen erhalten. Bitte entnehmen Sie der folgenden Liste das Modul hinter ihrem Namen.%0D%0A%0D%0A${data.modules}`
            return subject + body
        case 'reminderModule':
            subject = `mailto:${data.mail}?subject=Erinnerung: Rückmeldung zur Anerkennung des Moduls ${data.moduleName} &`
            body = `body=Hallo ${data.titel} ${data.profFirstName} ${data.profLastName},%0D%0A%0D%0AVor einigen Tagen habe ich Sie um die Prüfung eines Moduls für den Fall von ${data.gender} ${data.caseLastName} gebeten, und bisher keine Rückmeldung erhalten.%0D%0ADamit ich den Fall abschließen kann bitte ich um Ihre Rückmeldung zum Modul ${data.moduleName}.%0D%0A`
            return subject + body
        case 'convertGrades':
            subject = `mailto:notenumrechnen@fhdortmund.de?subject=Erinnerung: Umrechnung der Noten für einen Fall zur Prüfungsanerkennung &`
            body = `body=Sehr geehrte Damen und Herren,%0D%0A%0D%0AIch habe hier einen Fall vorliegen, bei dem die Benotung der Module einer früheren Hochschule einer Umrechnung bedürfen. %0D%0AAnbei die Unterlagen.`
            return subject + body
            
        default: return ''
    }
}
