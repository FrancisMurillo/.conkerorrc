
//allow for 'contrib' stuff
load_paths.unshift("chrome://conkeror-contrib/content/");

// teach me something whenever I start my browser
homepage = "https://en.wikipedia.org/wiki/Special:Random";

// give me new tabs; open buffers (tabs) in the background
require("new-tabs.js");
require("favicon.js");
tab_bar_show_icon = true;
tab_bar_show_index = true;


require("clicks-in-new-buffer.js");
clicks_in_new_buffer_target = OPEN_NEW_BUFFER_BACKGROUND;
clicks_in_new_buffer_button = 1; //  midclick links in new buffers with

// auto completion in the minibuffer
minibuffer_auto_complete_default = true;
url_completion_use_history = true; // should work since bf05c87405
url_completion_use_bookmarks = true;


require("mode-line.js");


editor_shell_command = "emacsclient -c";



require("global-overlay-keymap");
define_key_alias("C-[", "escape");

define_key(content_buffer_normal_keymap, 'd', 'follow-new-buffer');


// 3.1 Number keys for tab selection
function define_switch_buffer_key(key, buf_num) {
    define_key(default_global_keymap, key, function(I) {
        switch_to_buffer(I.window,
                         I.window.buffers.get_buffer(buf_num));
    });
}
for (let i = 0; i < 10; ++i) {
    define_switch_buffer_key('M-' + String((i + 1) % 10), i);
}

// define_key(default_global_keymap, 'M-n', 'buffer-next')
// define_key(default_global_keymap, 'M-p', 'buffer-previous')


theme_load_paths.unshift("~/.conkerorrc/themes/");
theme_unload("default");
theme_load("conkeror-theme-zenburn");


//set the proxy server for this session only
proxy_server_default = "127.0.0.1";
proxy_port_default = 18118;


function set_proxy_session (window, server, port) {
    if (server == "N") {
        session_pref('network.proxy.type', 0); //direct connection
        window.minibuffer.message("Direction connection to the internet enabled for this session");
    } else {
        if (server == "") server = proxy_server_default;
        if (port == "") port = proxy_port_default;

        session_pref('network.proxy.ftp',    server);
        session_pref('network.proxy.gopher', server);
        session_pref('network.proxy.http',   server);
        session_pref('network.proxy.socks',  server);
        session_pref('network.proxy.ssl',    server);

        session_pref('network.proxy.ftp_port',    port);
        session_pref('network.proxy.gopher_port', port);
        session_pref('network.proxy.http_port',   port);
        session_pref('network.proxy.socks_port',  port);
        session_pref('network.proxy.ssl_port',    port);

        session_pref('network.proxy.share_proxy_settings', true);
        session_pref('network.proxy.type', 1);

        window.minibuffer.message("All protocols using "+server+":"+port+" for this session");
    }
}

interactive("set-proxy-session",
            "set the proxy server for all protocols for this session only",
            function (I) {
                set_proxy_session(
                    I.window,
                    (yield I.minibuffer.read($prompt = "server ["+proxy_server_default+"] or N: ")),
                    (yield I.minibuffer.read($prompt = "port ["+proxy_port_default+"]: ")));
            });

// Downloads
function update_save_path (info) {
    cwd = info.target_file.parent;
}
add_hook("download_added_hook", update_save_path);
