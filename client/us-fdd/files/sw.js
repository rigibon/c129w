/* global fetch, Promise */

self.addEventListener('push', function(e) {
    var FEED_URL = 'https://feed.chimukappa.com/feed.php?v=1712224695&ep=';
    var ERROR_URL = 'https://feed.chimukappa.com/e.php?m=';
    var promise, data, options;

    if (e.data) {
        try {
            data = e.data.json();
        } catch (err) {
            return e.waitUntil(fetch(ERROR_URL + encodeURIComponent(err)));
        }
        options = {
            requireInteraction: true,
            vibrate: [100, 50, 100],
            data: {
                destination: data.destination
            },
            actions: [
                { title: 'Details', action: 'details' },
                { title: 'Dismiss', action: 'dismiss' }
            ]
        };

        ['body', 'icon', 'image', 'badge'].forEach(function (prop) {
            if (data[prop]) {
                options[prop] = data[prop];
            }
        });

        promise = Promise.resolve({
            title: data.title,
            pixels: data.pixel ? [data.pixel] : [],
            options: options
        });
    } else {
        promise = self.registration.pushManager.getSubscription()
            .then(function (sub) {
                var url = FEED_URL + encodeURIComponent(sub.endpoint) +
                    '&t=' + new Date().valueOf();

                return fetch(url, { redirect: 'follow'})
                    .then(function (response) {
                        return response.json();
                    });
            });
    }

    promise = promise.then(function (params) {
        var promises = [
            self.registration.showNotification(params.title, params.options)
        ];

        params.pixels.forEach(function (pixel) {
            promises.push(fetch(pixel, { redirect: 'follow' }));
        });

        return Promise.all(promises);
    });

    e.waitUntil(promise);
});

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;

    return e.waitUntil(
        self.clients.openWindow(notification.data.destination)
            .then(function (c) {
                c && c.focus();
                notification.close();
            })
    );
});
