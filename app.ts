#!/usr/bin/env -S gjs -m

import Gtk from 'gi://Gtk?version=3.0';
import GObject from 'gi://GObject';
import system from 'system';

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
        window.show_all();
    }
}

const Application = GObject.registerClass(_Application);

const app = new Application();
app.run([system.programInvocationName, ...system.programArgs]);