import isWindows from 'is-windows';

const defaultPort = 8080;

const devServerHost = isWindows() ? 'localhost' : '0.0.0.0';

export const devServerUrl = `http://${devServerHost}:${defaultPort}/`;

export const devServerConfig = {
    publicPath: '/',
    open: true,
    port: defaultPort,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    overlay: false,
    host: devServerHost,
};
