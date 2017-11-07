import * as express from 'express';

class App {
	public express;

	constructor () {
		this.express = express();
		this.mountRouts();
	}

	private mountRouts (): void {
		//TODO: @kdidenko - router must be extracted somewhere to controllers!
		const router = express.Router();
		//TODO: @kdidenko - routes dispatching below must be moved to controllers!
		router.get('/', (req, res) => {
			res.json({
				message: 'Accounts Service HOME route'
			})
		});
		//TODO: @kdidenko - base URL must be defined somewhere in config
		this.express.use('/', router);
	}
}

export default new App().express;
