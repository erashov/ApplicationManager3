import "reflect-metadata";
import "zone.js";
import "rxjs/add/operator/first";
import { enableProdMode, ApplicationRef, NgZone, ValueProvider } from "@angular/core";
import { platformDynamicServer, PlatformState, INITIAL_CONFIG } from "@angular/platform-server";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";
import { AppModule } from "./app/app.module.server";
import './app/polyfills';

enableProdMode();

export default createServerRenderer(params => {
    // tslint:disable-next-line:typedef
    const providers = [
        { provide: INITIAL_CONFIG, useValue: { document: "<app></app>", url: params.url } },
        { provide: "ORIGIN_URL", useValue: params.origin }
    ];

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef => {
        // tslint:disable-next-line:typedef
        const appRef = moduleRef.injector.get(ApplicationRef);
        // tslint:disable-next-line:typedef
        const state = moduleRef.injector.get(PlatformState);
        // tslint:disable-next-line:typedef
        const zone = moduleRef.injector.get(NgZone);

        return new Promise<RenderResult>((resolve, reject) => {
            zone.onError.subscribe(errorInfo => reject(errorInfo));
            appRef.isStable.first(isStable => isStable).subscribe(() => {
                // because 'onStable' fires before 'onError', we have to delay slightly before
                // completing the request in case there's an error to report
                setImmediate(() => {
                    resolve({
                        html: state.renderToString()
                    });
                    moduleRef.destroy();
                });
            });
        });
    });
});