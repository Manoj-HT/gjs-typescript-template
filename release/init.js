import Gtk from 'gi://Gtk?version=4.0';
import Gdk from 'gi://Gdk?version=4.0';
import GObject from 'gi://GObject';
import Gio from 'gi://Gio';
class _Application extends Gtk.Application {
    _init() {
        super._init({ application_id: 'org.example.GjsGtkWindow' });
    }
    vfunc_startup() {
        super.vfunc_startup();
        this.loadStylesheet();
    }
    vfunc_activate() {
        this.createWindow();
    }
    loadStylesheet() {
        const provider = new Gtk.CssProvider();
        const uri = import.meta.url;
        // style.css is expected to be in the same directory as this script (dist/)
        const cssUri = uri.replace('init.js', 'style.css');
        try {
            const cssFile = Gio.File.new_for_uri(cssUri);
            provider.load_from_file(cssFile);
            const display = Gdk.Display.get_default();
            if (display) {
                Gtk.StyleContext.add_provider_for_display(display, provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION);
            }
        }
        catch (e) {
            console.error('Failed to load CSS:', e);
        }
    }
    createWindow() {
        const window = new Gtk.ApplicationWindow({ application: this, title: 'GJS GTK Window' });
        window.set_default_size(400, 300);
        window.present();
    }
}
export const Application = GObject.registerClass(_Application);
