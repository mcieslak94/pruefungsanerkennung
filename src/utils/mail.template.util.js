export function GenerateTemplate (templateName, data) {
    let subject, body
    switch(templateName) {
        case 'missingDocumnets':
            subject = `mailto:${data.mail}?subject=Erinnerung: Anerkennung ihrer Prüfungsleistungen &`
            body = `body=Hallo ${data.firstName} ${data.lastName},%0D%0A%0D%0A Am ${data.date} haben Sie einen Antrag auf Prüfungsleistungen bei mir eingereicht.`
            return subject + body
        case 'reminderProf':
            subject = `mailto:${data.mail}?subject=Erinnerung: Anerkennung ihrer Prüfungsleistungen &`
            body = `body=Hallo ${data.firstName} ${data.lastName},%0D%0A%0D%0A Am ${data.date} haben Sie einen Antrag auf Prüfungsleistungen bei mir eingereicht.`
            return subject + body
        default: return ''
    }
}