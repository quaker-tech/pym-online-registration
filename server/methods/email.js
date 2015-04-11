Registrants.after.insert(function (userId, document) {
    // If SMTP is configured, send email when registration is added
    // Check whether email sending is enabled
    var emailEnabled = process.env.ENABLE_SMTP;

    if (emailEnabled) {
        // Email settings

        // Email address from registration
        var to = document.createdByEmail;

        // From address from mail configuration
        var from = process.env.MAIL_FROM;

        // HTML message
        var html = 'We have received your event registration for PYM 2015. <br /> \
                                View your registration(s) by visiting: <br />\
                                <a href="http://register.pacificyearlymeeting.org/view">\
                                http://register.pacificyearlymeeting.org/view</a>';

        Email.send({
            from: from,
            to: to,
            subject: "[PYM 2015] Registration success!",
            html: html
        });
    }
});