import Gtk from 'gi://Gtk?version=4.0';
import GObject from 'gi://GObject';

class _Application extends Gtk.Application {
    _init(): void {
        super._init({ application_id: 'org.example.GjsGtkWindow' });
    }

    vfunc_activate(): void {
        this.createWindow();
    }

    createWindow(): void {
        const window = new Gtk.ApplicationWindow({ application: this, title: 'GJS GTK Window' });
        window.set_default_size(400, 300);
        window.present();
    }
}

export const Application = GObject.registerClass(_Application);
