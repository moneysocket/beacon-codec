Moneysocket Beacon Encoder and Decoder App
-----

This is a simple frontend for encoding and decoding beacons using the [js-moneysocket](https://github.com/moneysocket/js-moneysocket) library.

It is hosted on the web for your convenience at [https://socket.money/beacon](https://socket.money/beacon).


Dependencies
------------------------------------------------------------------------

This depends on [js-moneysocket](https://github.com/moneysocket/js-moneysocket) which will need to be installed into `node_modules` prior to building this project.

`$ git clone https://github.com/moneysocket/beacon-codec`

`$ cd beacon-codec`

`$ npm install https://github.com/moneysocket/js-moneysocket`

Also, [package.json](package.json) specifies additional dependencies that will need to be installed. From the cloned directory:

`$ npm install`

Building
------------------------------------------------------------------------

This uses `gulp` to build the application.

From the cloned directory with the dependencies installed:

`$ gulp quick` will build to the `htdocs/` directory

`$ gulp full` will take longer but will produce optimized javascript

`$ gulp quick_watch` will watch the source files for changes and automatically rebuild


Running
------------------------------------------------------------------------

Once, built the web root will be set up under `htdocs/`. If you want to run it locally, use a webserver. eg:

`$ cd htdocs`
`$ python -m SimpleHTTPServer 1234`

and point your browser at the port. eg:

`$ firefox http://localhost:1234`


Project Links
------------------------------------------------------------------------

- [Homepage](https://socket.money).
- [Twitter](https://twitter.com/moneysocket)
- [Telegram](https://t.me/moneysocket)
- [Donate](https://socket.money/#donate)
