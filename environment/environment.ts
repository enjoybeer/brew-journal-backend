import { EnvironmentConfig } from './environment-config';


class Environment {
    public readonly config: EnvironmentConfig;

    constructor(public readonly name: string) {
        try {
            this.config = require(`./configs/${name}.config.ts`).default as EnvironmentConfig;
        } catch (error) {
            if (error.name === 'MODULE_NOT_FOUND') {
                throw new Error(`Cannot find "${name}" environment config. `
                    + `Please check "${name}.config.ts" file is included in "environment/configs/" directory.`);
            } else {
                throw error;
            }
        }
    }
}


export const environment = new Environment(process.env.BJ_ENVIRONMENT || 'local_dev');
