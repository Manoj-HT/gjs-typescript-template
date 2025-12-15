#!/usr/bin/env -S gjs -m

import Gtk from 'gi://Gtk?version=3.0';
import GObject from 'gi://GObject';
import system from 'system';

// Create a new Gtk application
const Application = GObject.registerClass(
    class Application extends Gtk.Application {
        _init() {
            super._init({ application_id: 'org.example.GjsGtkWindow' });
        }

        vfunc_activate() {
            this.createWindow();
        }

        createWindow() {
            const window = new Gtk.ApplicationWindow({ application: this, title: 'GJS GTK Window' });
            window.set_default_size(400, 300);
            window.show_all();
        }
    }
);

// Run the application
const app = new Application();
app.run([system.programInvocationName, ...system.programArgs]);
