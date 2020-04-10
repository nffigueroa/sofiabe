
export const Response = async (req: any, res: any, next: any, middleware: any) => {
    try {
        const middleWareResponse = await middleware(req, res, next);
        if ([200, 201].find(element => element === middleWareResponse.status)) {
            res.status(middleWareResponse.status).send({
                status: middleWareResponse.status,
                error: false,
                body: middleWareResponse.body
            })
        } else {
            res.status(middleWareResponse.status).send({
                status: middleWareResponse.status,
                error: true,
                body: middleWareResponse.body
            })
        }
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: true,
            body: error.message
        })
    }
}