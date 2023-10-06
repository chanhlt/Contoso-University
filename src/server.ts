import Koa from 'koa';

export default (app: Koa) => ({
    start: () => {
        const PORT = process.env.HTTP_PORT as string;
        app.listen(PORT, () => console.log('Server is running on port ' + PORT))
    }
});
