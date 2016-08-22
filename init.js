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
