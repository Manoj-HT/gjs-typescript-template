import Gtk from 'gi://Gtk?version=4.0';
import Gdk from 'gi://Gdk?version=4.0';
import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
import { loadCss } from './utils/css.js';

class _Application extends Gtk.Application {
    _init(): void {
        super._init({ application_id: 'org.example.GjsGtkWindow' });
    }

    vfunc_startup(): void {
        super.vfunc_startup();
        this.loadStylesheet();
    }

    vfunc_activate(): void {
        this.createWindow();
    }

    loadStylesheet(): void {
        loadCss('./styles/main.css', import.meta.url);
    }

    createWindow(): void {
        const window = new Gtk.ApplicationWindow({ application: this, title: 'GJS GTK Window' });
        window.set_default_size(400, 300);
        window.present();
    }
}
export const Application = GObject.registerClass(_Application);
