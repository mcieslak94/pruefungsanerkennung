export function CreateTemplate (templateName, data) {
    let subject, body
    switch(templateName) {
        case 'missingDoc':
            subject = `mailto:${data.mail}?subject=Erinnerung: Anerkennung ihrer Prüfungsleistungen &`
            body = `body=Hallo ${data.gender} ${data.lastName},%0D%0A%0D%0A Am ${data.date} haben Sie einen Antrag auf Anerkennung von Prüfungsleistungen bei mir eingereicht.%0D%0A%0D%0A
            Dabei fehlen noch folgende Dokumente bzw. sind nicht vollständig: ${data.docs}. 
            Bitte reichen Sie mir diese in den nächsten 7 Tagen nach. Ansonsten werde ich den Fall schließen.%0D%0A%0D%0A`
            return subject + body
        case 'sendToAllProfs':
            subject = `mailto:${data.mail}?subject=Module anerkennen lassen &`
            body = `body=Hallo Kollegen,%0D%0A%0D%0A Ich habe einen neuen Antrag auf Anerkennung von Prüfungsleistungen erhalten. Bitte entnehmen Sie der folgenden Liste .`
            return subject + body
        case 'reminderModule':
            subject = `mailto:${data.mail}?subject=Erinnerung: Rückmeldung zur Anerkennung des Moduls ${data.moduleName} &`
            body = `body=Hallo ${data.titel} ${data.profLastName},%0D%0A%0D%0A Am ${data.date} habe ich Sie um die Prüfung eines Moduls für den Fall von ${data.gender} ${data.caseLastName} gebeten, jedoch bisher keine Rückmeldung erhalten.%0D%0A%0D%0A
                damit ich den Fall abschließen kann, bitte ich um ihre Rückmeldung.%0D%0A%0D%0A`
            return subject + body
        default: return ''
    }
}