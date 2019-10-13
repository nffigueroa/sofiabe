'use strict';

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3001;
_app2.default.listen(PORT, function () {
    console.log('Running in http://localhost:' + PORT);
});