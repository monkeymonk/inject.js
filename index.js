/**
 * @example
 * inject('test.css', function (error, node) {
 *     if (error) {
 *         console.log('-> error!', error, node);
 *     } else {
 *         console.log('-> injected!', node);
 *     }
 * });
 *
 * @param files
 * @param callback
 * @param options
 */
export function inject(files, callback, options = {}) {
    if (typeof files === 'string') {
        files = [files];
    }

    options = {
        async: false,
        attrs: [],
        text: null,
        type: null, // 'text/javascript' or 'stylesheet'
        ...options,
    };

    if (!/in/.test(document.readyState)) {
        const head = document.head || document.getElementsByTagName('head')[0];
        let i = files.length;
        let node;
        let file;

        while (file = files[--i]) {
            if (/\.css$/i.test(file)) {
                options.type = 'stylesheet';
            } else if (/\.js$/i.test(file)) {
                options.type = 'text/javascript';
            }

            if (options.type === 'stylesheet') {
                node = document.createElement('link');
                node.href = file;
                node.rel = options.type;
            } else if (options.type === 'text/javascript') {
                node = document.createElement('script');
                node.async = options.async;
                node.src = file;
                node.type = options.type;

                if (options.text) {
                    node.text = `${options.text}`;
                }
            }

            Object.entries(options.attrs).forEach(([k, v]) => {
                node.setAttribute(k, v);
            });

            node.onreadystatechange = function () {
                if (this.readyState === 'complete') {
                    load.call(this);
                }
            };

            node.onload = function () {
                this.onerror = this.onload = null;
                load();
            };

            node.onerror = function () {
                // this.onload = null here is necessary
                // because even IE9 works not like others
                this.onerror = this.onload = null;
                callback(new Error(`Failed to load ${this.src}`), node);
            };

            head.appendChild(node);
        }

        function load() {
            if (i === 0 && typeof callback === 'function') {
                callback(null, node);
            }
        }
    } else {
        setTimeout(() => inject(files, callback), 9);
    }
}
