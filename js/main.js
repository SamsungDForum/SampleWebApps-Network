App = window.App || {};
App.Main = (function Main() {
    var logger = null;
    var leftColumnEl = document.querySelector('#network-info .left-column');
    var rightColumnEl = document.querySelector('#network-info .right-column');
    var networkStatusEl = document.querySelector('#network-status');
    var NETWORK_STATES = {
        1: 'LAN_CABLE_ATTACHED',
        2: 'LAN_CABLE_DETACHED',
        3: 'LAN_CABLE_STATE_UNKNOWN',
        4: 'GATEWAY_CONNECTED',
        5: 'GATEWAY_DISCONNECTED',
        6: 'WIFI_MODULE_STATE_ATTACHED',
        7: 'WIFI_MODULE_STATE_DETACHED',
        8: 'WIFI_MODULE_STATE_UNKNOWN'
    };
    var NETWORK_IP_MODE = {
        0: 'NONE',
        1: 'STATIC',
        2: 'DYNAMIC',
        3: 'AUTO',
        4: 'FIXED',
        5: 'UNKNOWN'
    };
    var CONNECTION_TYPE = {
        0: 'DISCONNECTED',
        1: 'WIFI',
        2: 'CELLULAR',
        3: 'ETHERNET'
    };
    var WIFI_SIGNAL_STRENGTH = {
        1: 'below -88dBm',
        2: '-88 ~ -77dBm',
        3: '-77 ~ -66dBm',
        4: '-66 ~ -55dBm',
        5: 'above -55dBm'
    };
    var WIFI_ENCRYPTION_TYPE = {
        1: 'WEP',
        2: 'TKIP',
        3: 'AES',
        4: 'TKIP_AES_MIXED',
        5: 'NONE',
        6: 'UNKNOWN'
    };

    function getVersion() {
        var version;

        try {
            version = webapis.network.getVersion();
        } catch (e) {
            logger.error(e.message);
        }

        return version;
    }

    function isConnectedToGateway() {
        var isConnected = false;

        try {
            isConnected = webapis.network.isConnectedToGateway();
        } catch (e) {
            logger.error(e.message);
        }

        return isConnected;
    }

    function getIpMode() {
        var ipMode;

        try {
            ipMode = webapis.network.getIpMode();
        } catch (e) {
            logger.error(e.message);
        }

        return ipMode;
    }

    function getSubnetMask() {
        var subnetMask;

        try {
            subnetMask = webapis.network.getSubnetMask();
        } catch (e) {
            logger.error(e.message);
        }

        return subnetMask;
    }

    function getGateway() {
        var gateway;

        try {
            gateway = webapis.network.getGateway();
        } catch (e) {
            logger.error(e.message);
        }

        return gateway;
    }

    function getMac() {
        var mac;

        try {
            mac = webapis.network.getMac();
        } catch (e) {
            logger.error(e.message);
        }

        return mac;
    }

    function getDns() {
        var dns;

        try {
            dns = webapis.network.getDns();
        } catch (e) {
            logger.error(e.message);
        }

        return dns;
    }

    function getIp() {
        var ip;

        try {
            ip = webapis.network.getIp();
        } catch (e) {
            logger.error(e.message);
        }

        return ip;
    }

    function getActiveConnectionType() {
        var activeConnectionType;

        try {
            activeConnectionType = webapis.network.getActiveConnectionType();
        } catch (e) {
            logger.error(e.message);
        }

        return activeConnectionType;
    }

    function getWiFiSsid(activeConnectionType) {
        var wiFiSsid = 'N/A';

        if (activeConnectionType === parseInt(App.Utils.getKeyForValue('WIFI', CONNECTION_TYPE), 10)) {
            try {
                wiFiSsid = webapis.network.getWiFiSsid();
            } catch (e) {
                logger.error(e.message);
            }
        }

        return wiFiSsid;
    }

    function getWiFiSignalStrengthLevel(activeConnectionType) {
        var wiFiSignalStrength = 'N/A';
        var wiFiSignalStrengthLevel;

        if (activeConnectionType === parseInt(App.Utils.getKeyForValue('WIFI', CONNECTION_TYPE), 10)) {
            try {
                wiFiSignalStrengthLevel = webapis.network.getWiFiSignalStrengthLevel();
                wiFiSignalStrength = wiFiSignalStrengthLevel
                    + ' (' + WIFI_SIGNAL_STRENGTH[wiFiSignalStrengthLevel] + ')';
            } catch (e) {
                logger.error(e.message);
            }
        }

        return wiFiSignalStrength;
    }

    function getWiFiEncryptionType(activeConnectionType) {
        var wiFiEncryption = 'N/A';
        var wiFiEncryptionType;

        if (activeConnectionType === parseInt(App.Utils.getKeyForValue('WIFI', CONNECTION_TYPE), 10)) {
            try {
                wiFiEncryptionType = webapis.network.getWiFiEncryptionType();
                wiFiEncryption = wiFiEncryptionType
                    + ' (' + WIFI_ENCRYPTION_TYPE[wiFiEncryptionType] + ')';
            } catch (e) {
                logger.error(e.message);
            }
        }

        return wiFiEncryption;
    }

    function getSecondaryDns() {
        var secondaryDns;

        try {
            secondaryDns = webapis.network.getSecondaryDns();
        } catch (e) {
            logger.error(e.message);
        }

        return secondaryDns;
    }

    function getCurrentDhcpOption60Field() {
        var currentDhcpOption60Field;

        try {
            currentDhcpOption60Field = webapis.network.getCurrentDhcpOption60Field();
        } catch (e) {
            logger.error(e.message);
        }

        return currentDhcpOption60Field;
    }

    function checkCurrentIpWith60Field() {
        var currentIpWith60Field;

        try {
            currentIpWith60Field = webapis.network.checkCurrentIpWith60Field();
        } catch (e) {
            logger.error(e.message);
        }

        return currentIpWith60Field;
    }

    function getNetworkInfo() {
        var ipMode = getIpMode();
        var activeConnectionType = getActiveConnectionType();
        var networkInfo = {
            Version: getVersion(),
            IsConnectedToGateway: isConnectedToGateway(),
            IPMode: [ipMode, ' (', NETWORK_IP_MODE[ipMode], ')'].join(''),
            SubnetMask: getSubnetMask(),
            Gateway: getGateway(),
            MAC: getMac(),
            DNS: getDns(),
            IP: getIp(),
            ActiveConnectionType: [activeConnectionType, ' (', CONNECTION_TYPE[activeConnectionType], ')'].join(''),
            WiFiSsid: getWiFiSsid(activeConnectionType),
            WiFiSignalStrengthLevel: getWiFiSignalStrengthLevel(activeConnectionType),
            WiFiEncryptionType: getWiFiEncryptionType(activeConnectionType),
            SecondaryDns: getSecondaryDns() || 'N/A',
            CurrentDhcpOption60Field: getCurrentDhcpOption60Field() || 'N/A',
            CurrentIpWith60Field: checkCurrentIpWith60Field() || 'N/A'
        };

        return networkInfo;
    }

    function createParagraph(text) {
        var p = document.createElement('p');

        p.innerHTML = text;

        return p;
    }

    function showNetworkInfo() {
        var networkInfo = getNetworkInfo();

        leftColumnEl.innerHTML = '';
        rightColumnEl.innerHTML = '';
        Object.getOwnPropertyNames(networkInfo).map(function (propName) {
            return createParagraph(propName + ': ' + networkInfo[propName]);
        }).forEach(function (p, index, array) {
            if (index < array.length / 2) {
                leftColumnEl.appendChild(p);
            } else {
                rightColumnEl.appendChild(p);
            }
        });
    }

    function isDisconnectedState(stateName) {
        return ['LAN_CABLE_DETACHED', 'LAN_CABLE_STATE_UNKNOWN', 'GATEWAY_DISCONNECTED',
            'WIFI_MODULE_STATE_DETACHED', 'WIFI_MODULE_STATE_UNKNOWN'].indexOf(stateName) > -1;
    }

    function updateNetworkState(stateId) {
        var stateName = NETWORK_STATES[stateId];

        if (isDisconnectedState(stateName)) {
            networkStatusEl.classList.remove('connected');
            networkStatusEl.classList.add('disconnected');
        } else {
            networkStatusEl.classList.remove('disconnected');
            networkStatusEl.classList.add('connected');
        }
        networkStatusEl.innerHTML = NETWORK_STATES[stateId];

        showNetworkInfo();
    }

    window.onload = function onload() {
        var loggerContainer = document.querySelector('.logsContainer');
        var initialNetworkState = CONNECTION_TYPE[getActiveConnectionType()] !== 'DISCONNECTED'
            ? App.Utils.getKeyForValue('GATEWAY_CONNECTED', NETWORK_STATES)
            : App.Utils.getKeyForValue('GATEWAY_DISCONNECTED', NETWORK_STATES);

        logger = App.Logger.create({
            loggerEl: loggerContainer,
            loggerName: 'Main',
            logLevel: App.Logger.logLevels.ALL
        });

        updateNetworkState(initialNetworkState);
        webapis.network.addNetworkStateChangeListener(updateNetworkState);
    };
}());
