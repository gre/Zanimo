/*
 * $.js - utils
 */

function $(s, c) { return (c || document).querySelector(s); }
function $$(s, c) { return (c || document).querySelectorAll(s); }
function empty() { }
window.isTouchable = document.ontouchstart === null;
