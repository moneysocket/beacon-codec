// Copyright (c) 2020 Jarret Dyrbye
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php

const Crypto = require('crypto');
const Kjua = require('kjua');
const moneysocket = require('moneysocket');

const DomUtl = require('./ui/domutl.js').DomUtl;
const SharedSeed = moneysocket.SharedSeed;
const BinUtl = moneysocket.BinUtl;
const MoneysocketBeacon = moneysocket.MoneysocketBeacon;
const WebsocketLocation = moneysocket.WebsocketLocation;
const BigSize = moneysocket.BigSize;
const UInt64 = moneysocket.UInt64;


const PROTOCOL_PREFIX = "moneysocket:"


const DEFAULT_HOST = "relay.socket.money";
const DEFAULT_PORT = 443;
const DEFAULT_USE_TLS = true;

//////////////////////////////////////////////////////////////////////////////

class Encode {
    constructor() {
        this.tls = DEFAULT_USE_TLS;
    }

    generateSharedSeed() {
        var seed_input = document.getElementById("shared-seed");
        var shared_seed = Crypto.randomBytes(16).toString("hex");
        seed_input.value = shared_seed;
    }

    setupSharedSeedButton() {
        var seed_button = document.getElementById("new-shared-seed");
        seed_button.onclick = (function() {this.generateSharedSeed()}).bind(this);
    }

    toggleTls() {
        var tls = document.getElementById("tls");
        if (this.tls) {
            this.tls = false;
            tls.innerHTML = "False";
        } else {
            this.tls = true;
            tls.innerHTML = "True";
        }
    }

    setupTlsToggleButton() {
        var tls_toggle = document.getElementById("toggle-tls");
        tls_toggle.onclick = (function() {this.toggleTls()}).bind(this);
    }

    setupHostInput() {
        var host_div = document.getElementById("host");
        host_div.value = DEFAULT_HOST;
    }

    setupPortInput() {
        var port_div = document.getElementById("port");
        port_div.value = DEFAULT_PORT;
    }

    doEncode() {
        var s = document.getElementById("shared-seed");
        var shared_seed = new SharedSeed(BinUtl.toByteArray(s.value));

        var use_tls = this.tls;

        var h = document.getElementById("host");
        var host = h.value;

        var p = document.getElementById("port");
        var port = p.value;

        var location = new WebsocketLocation(host, port, use_tls);
        var beacon = new MoneysocketBeacon(shared_seed);
        beacon.addLocation(location);

        var e = document.getElementById("encoded-text");
        e.value = beacon.toBech32Str();
        var q = document.getElementById("encoded-qr-code");
        q.innerHTML = "";
        DomUtl.qrCode(q, beacon.toBech32Str(), PROTOCOL_PREFIX);
    }

    setupEncode() {
        var e = document.getElementById("encode");
        e.onclick = (function() {this.doEncode()}).bind(this);
    }
}

//////////////////////////////////////////////////////////////////////////////

class Decode {

    doDecode() {
        var out_text = '';
        var text = document.getElementById("input-beacon").value;

        if (text.startsWith(PROTOCOL_PREFIX)) {
            text = text.slice(PROTOCOL_PREFIX.length);
        }

        var [beacon, err] = MoneysocketBeacon.fromBech32Str(text);
        if (err != null) {
            out_text = err;
        } else {
            out_text = JSON.stringify(beacon.toDict(), null, ' ');
        }

        var out = document.getElementById("output-beacon");
        out.value = out_text;
    }

    setupDecodeButton() {
        var d = document.getElementById("decode");
        d.onclick = (function() {this.doDecode()}).bind(this);
    }

}

//////////////////////////////////////////////////////////////////////////////

class EncodeDecodeApp {
    constructor() {
        this.e = null;
        this.d = null;
    }

    draw() {
        this.e = new Encode();
        this.e.generateSharedSeed();
        this.e.setupSharedSeedButton();
        this.e.setupTlsToggleButton();
        this.e.setupHostInput();
        this.e.setupPortInput();
        this.e.setupEncode();

        this.d = new Decode();
        this.d.setupDecodeButton();
    }
}

//////////////////////////////////////////////////////////////////////////////

window.app = new EncodeDecodeApp();

function drawFirstUi() {
    window.app.draw();
}

window.addEventListener("load", drawFirstUi());
