import Gtk from 'gi://Gtk?version=4.0';
import Gdk from 'gi://Gdk?version=4.0';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';

/**
 * Loads a CSS file and adds it to the default display.
 * 
 * @param relativePath - The path to the CSS file relative to the `baseUrl`.
 * @param baseUrl - The base URL to resolve from, typically `import.meta.url`.
 */
export function loadCss(relativePath: string, baseUrl: string): void {
    const provider = new Gtk.CssProvider();
    
    try {
        // Convert baseUrl (file:// URI) to file path
        const [baseFile] = GLib.filename_from_uri(baseUrl);
        if (!baseFile) {
            throw new Error(`Invalid base URL: ${baseUrl}`);
        }
        
        // Get directory of the base file
        const baseDir = GLib.path_get_dirname(baseFile);
        
        // Resolve relative path
        const cssPath = GLib.build_filenamev([baseDir, relativePath]);
        
        const cssFile = Gio.File.new_for_path(cssPath);
        
        provider.load_from_file(cssFile);
        
        const display = Gdk.Display.get_default();
        if (display) {
            Gtk.StyleContext.add_provider_for_display(
                display,
                provider,
                Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
            );
        }
    } catch (e) {
        console.error(`Failed to load CSS from ${relativePath}:`, e);
    }
}