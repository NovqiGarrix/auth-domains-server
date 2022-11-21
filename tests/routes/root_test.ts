import { equal, superdeno } from '@testDeps';
import createServer from '@app';

Deno.test("Root Route Test", async () => {
    const app = createServer();
    await superdeno(app.handle.bind(app))
        .get("/")
        .expect(200)
        .expect((res) => {
            equal(res.body.data, {
                data: "Hello, World",
                error: null
            });
        });
})