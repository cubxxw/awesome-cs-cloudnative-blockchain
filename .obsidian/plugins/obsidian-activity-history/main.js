'use strict';

var obsidian = require('obsidian');
require('constants');

/**
 * Calculate size of MD files in the specified directory
 * @param projectPath - path to project e.g. 'Test Project/First Sub Project'
 * @param vaultFiles - list of all TFiles of Obsidian vault
 */
const getProjectSize = (projectPath, vaultFiles) => {
    let projectSize = 0;
    let reg = new RegExp(`^${projectPath}\/.*\.md$`);
    if (projectPath === '/') {
        reg = new RegExp(`^.*\.md$`);
    }
    for (let file in vaultFiles) {
        if (vaultFiles[file].path.match(reg)) {
            projectSize += vaultFiles[file].stat.size;
        }
    }
    return projectSize;
};
const updateActivity = (projectPath, vaultFiles, activitySettings) => {
    let timestampNow = getTimestamp();
    let newSize = getProjectSize(projectPath, vaultFiles);
    let checkpoint = getProjectCheckpoint(projectPath, activitySettings.checkpointList);
    let activity = Math.abs(newSize - checkpoint.size);
    if (timestampNow == checkpoint.date) {
        updateProjectCheckpoint(projectPath, activitySettings.checkpointList, timestampNow, newSize);
        activity = activity + getActivityAtDate(projectPath, activitySettings.activityHistory, timestampNow);
        updateActivityAtDate(projectPath, activitySettings.activityHistory, timestampNow, activity);
    }
    updateProjectCheckpoint(projectPath, activitySettings.checkpointList, timestampNow, newSize);
    updateActivityAtDate(projectPath, activitySettings.activityHistory, timestampNow, activity);
};
/**
 * Return timestamp for current day
 */
const getTimestamp = () => {
    let today = new Date();
    let timestamp = today.getFullYear().toString();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    timestamp += `-${((month < 10) ? '0' : '') + month.toString()}`;
    timestamp += `-${((date < 10) ? '0' : '') + date.toString()}`;
    return timestamp;
};
/**
 * Return size for specified day
 */
const getActivityAtDate = (projectPath, activityHistoryList, timestamp) => {
    for (let index = 0; index < activityHistoryList.length; index++) {
        if (projectPath == activityHistoryList[index].path) {
            for (let i = 0; i < activityHistoryList[index].size.length; i++) {
                if (activityHistoryList[index].size[i].date == timestamp) {
                    return activityHistoryList[index].size[i].value;
                }
            }
        }
    }
    return null;
};
/**
 * Return Activity History for specified project
 */
const getProjectActivityHistory = (projectPath, activityHistoryList) => {
    for (let index = 0; index < activityHistoryList.length; index++) {
        if (projectPath == activityHistoryList[index].path) {
            return activityHistoryList[index];
        }
    }
    return null;
};
/**
 * Return checkpoint size & date for specified project
 */
const getProjectCheckpoint = (projectPath, checkpointList) => {
    for (let index = 0; index < checkpointList.length; index++) {
        if (projectPath == checkpointList[index].path) {
            return checkpointList[index];
        }
    }
    return null;
};
/**
 * Update checkpoint size & date for specified project
 */
const updateProjectCheckpoint = (projectPath, checkpointList, valueDate, valueSize) => {
    for (let index = 0; index < checkpointList.length; index++) {
        if (projectPath == checkpointList[index].path) {
            checkpointList[index] = { path: projectPath, date: valueDate, size: valueSize };
        }
    }
};
/**
 * Return initialization status for specified project
 */
const getInitializationStatus = (projectPath, initializationList) => {
    for (let index = 0; index < initializationList.length; index++) {
        if (projectPath == initializationList[index].path) {
            return initializationList[index];
        }
    }
    return null;
};
/**
 * Update timestamp for specified day
 */
const updateActivityAtDate = (projectPath, activityHistoryList, timestamp, value) => {
    for (let index = 0; index < activityHistoryList.length; index++) {
        if (projectPath == activityHistoryList[index].path) {
            for (let i = activityHistoryList[index].size.length - 1; i >= 0; i--) {
                if (activityHistoryList[index].size[i].date == timestamp) {
                    activityHistoryList[index].size[i].value = value;
                    return true;
                }
            }
            activityHistoryList[index].size.push({ date: timestamp, value: value });
            return true;
        }
    }
    return false;
};
/**
 * Check if project path is being tracked
 */
const isTracked = (projectPath, trackedProjects) => {
    return trackedProjects.contains(projectPath);
};
/**
 * Check if project path is valid (at least 1 md file contained)
 */
const isValidProject = (projectPath, vaultFiles) => {
    let reg = new RegExp(`^${projectPath}\/.*\.md$`);
    for (let file in vaultFiles) {
        if (vaultFiles[file].path.match(reg)) {
            return true;
        }
    }
    return false;
};
/**
 * Stop tracking specified project
 */
const removeProject = (projectPath, activitySettings) => {
    activitySettings.trackedProjects.remove(projectPath);
    activitySettings.initialized.remove(getInitializationStatus(projectPath, activitySettings.initialized));
    activitySettings.checkpointList.remove(getProjectCheckpoint(projectPath, activitySettings.checkpointList));
    activitySettings.activityHistory.remove(getProjectActivityHistory(projectPath, activitySettings.activityHistory));
    return activitySettings;
};
/**
 * Start tracking specified project
 */
const addProject = (projectPath, activitySettings, vaultFiles) => {
    let timestampNow = getTimestamp();
    activitySettings.trackedProjects.push(projectPath);
    activitySettings.initialized.push({ path: projectPath, initialized: true });
    activitySettings.checkpointList.push({ path: projectPath, date: timestampNow, size: getProjectSize(projectPath, vaultFiles) });
    activitySettings.activityHistory.push({ path: projectPath, size: [{ date: timestampNow, value: 0 }] });
    return activitySettings;
};
/**
 * Get Year Span for specified project
 */
const getYearRange = (projectPath, activityHistoryList) => {
    let yearRange = [];
    for (let index = 0; index < activityHistoryList.length; index++) {
        if (projectPath == activityHistoryList[index].path) {
            for (let i = activityHistoryList[index].size.length - 1; i >= 0; i--) {
                let yearTmp = activityHistoryList[index].size[i].date.split('-')[0];
                if (yearRange) {
                    if (yearRange.every(x => x.year != yearTmp)) {
                        yearRange.push({ year: yearTmp });
                    }
                }
            }
        }
    }
    return yearRange;
};
/**
 * Check if string is a valid hexcolor
 */
const isHexColor = (hex) => {
    return typeof hex === 'string'
        && hex.length === 7
        && hex[0] === '#';
};
const updateActivityAll = (activitySettings, vaultFiles) => {
    // Loop over all tracked projects
    for (let project in activitySettings.trackedProjects) {
        updateActivity(activitySettings.trackedProjects[project], vaultFiles, activitySettings);
    }
};

class ActivityHistorySettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Activity History Settings' });
        new obsidian.Setting(containerEl)
            .setName('Tracked Projects:')
            .setDesc(this.plugin.settings.trackedProjects.join(" ---------  "));
        new obsidian.Setting(containerEl)
            .setName('Track Project:')
            .setDesc('Add project to tracking list. e.g. write `Project 1` to track the project located in `/Project 1`')
            .addText(text => text
            .setPlaceholder(`Project Example`)
            .onChange(async (value) => {
            if (value.trim() === '/') {
                return;
            }
            // check if project already tracked
            if (isTracked(value, this.plugin.settings.trackedProjects)) {
                return;
            }
            // check if project is a valid project
            if (!isValidProject(value, this.plugin.app.vault.getMarkdownFiles())) {
                return;
            }
            // add & initialize project
            addProject(value, this.plugin.settings, this.plugin.app.vault.getMarkdownFiles());
            // save settings
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Stop Tracking Project:')
            .setDesc('Remove project from the tracking list. e.g. `Project 1`')
            .addText(text => text
            .setPlaceholder(`Project Example`)
            .onChange(async (value) => {
            if (value.trim() === '/') {
                return;
            }
            // check if project being tracked
            if (!isTracked(value, this.plugin.settings.trackedProjects)) {
                return;
            }
            // add & initialize project
            removeProject(value, this.plugin.settings);
            // save settings
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Activity 1 Color:')
            .setDesc('Color for lowest activity. Placeholder shows current color.')
            .addDropdown(dropDown => dropDown
            .addOption('yearly', 'Yearly')
            .addOption('monthly', 'Monthly')
            .setValue(this.plugin.settings.type || 'yearly')
            .onChange((value) => {
            this.plugin.settings.type = value;
            this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Activity 1 Color:')
            .setDesc('Color for lowest activity. Placeholder shows current color.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.activityColor1)
            .onChange(async (value) => {
            // check if valid hex
            if (!isHexColor(value)) {
                return;
            }
            this.plugin.settings.activityColor1 = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Activity 2 Color:')
            .setDesc('Color for low activity. Placeholder shows current color.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.activityColor2)
            .onChange(async (value) => {
            // check if valid hex
            if (!isHexColor(value)) {
                return;
            }
            this.plugin.settings.activityColor2 = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Activity 3 Color:')
            .setDesc('Color for medium activity. Placeholder shows current color.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.activityColor3)
            .onChange(async (value) => {
            // check if valid hex
            if (!isHexColor(value)) {
                return;
            }
            this.plugin.settings.activityColor3 = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Activity 4 Color:')
            .setDesc('Color for highest activity. Placeholder shows current color.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.activityColor4)
            .onChange(async (value) => {
            // check if valid hex
            if (!isHexColor(value)) {
                return;
            }
            this.plugin.settings.activityColor4 = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Text color:')
            .setDesc('Text color. Placeholder shows current color.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.textColor)
            .onChange(async (value) => {
            // check if valid hex
            if (!isHexColor(value)) {
                return;
            }
            this.plugin.settings.textColor = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Empty color:')
            .setDesc('Empty color. Placeholder shows current color.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.emptyColor)
            .onChange(async (value) => {
            // check if valid hex
            if (!isHexColor(value)) {
                return;
            }
            this.plugin.settings.emptyColor = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName('Cell Radius:')
            .setDesc('Cell Radius. integer, default is 1 = square, the higher the more round.')
            .addText(text => text
            .setPlaceholder(this.plugin.settings.cellRadius)
            .onChange(async (value) => {
            let numValue = parseInt(value);
            // check if valid hex
            if (isNaN(numValue)) {
                return;
            }
            this.plugin.settings.cellRadius = Math.abs(numValue);
            await this.plugin.saveSettings();
        }));
    }
}

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/**
 * Get the last day of the month.
 *
 * @param {Date} date
 *
 * @return {Date}
 */
function getMonthEnd(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Get the first day of the month.
 *
 * @param {Date} date
 *
 * @return {Date}
 */
function getMonthStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get the last day of the week.
 *
 * @param {Date} date
 *
 * @return {Date}
 */
function getWeekEnd(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - date.getDay()));
}

/**
 * Return the week index of a date.
 *
 * @param {Date} date
 *
 * @return {number}
 */
function getWeekIndex(date) {
    const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const offsetDate = date.getDate() + firstWeekday - 1;

    return Math.floor(offsetDate / 7);
}

/**
 * Get the first day of the week.
 *
 * @param {Date} date
 *
 * @return {Date}
 */
function getWeekStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
}

/**
 * Normalize to a javascript Date object.
 *
 * @param {Date|number|string} value
 *
 * @return {Date}
 */
function normalizeDate(value) {
    if (value instanceof Date) {
        return value;
    }

    if (['number', 'string'].includes(typeof value)) {
        return new Date(value);
    }

    throw new Error('Invalid date value');
}

/**
 * Stringify a date.
 *
 * @param {Date} date
 * 
 * @return {string}
 */
function stringifyDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/**
 * Divide a calendar into months.
 *
 * @param {Object}              options
 * @param {boolean}             options.allowOverflow
 * @param {Array<Object>}       options.calendar
 * @param {Date|string|number}  options.endDate
 * @param {Date|string|number}  options.startDate
 *
 * @return {Array<Array<Object>>} 
 */
function chunkMonths({ allowOverflow, calendar, endDate, startDate }) {
    let prevMonth = -1;

    startDate = normalizeDate(startDate);
    endDate = normalizeDate(endDate);

    return calendar.reduce((acc, day) => {
        const currentMonth = day.date.getMonth();

        if (prevMonth !== currentMonth) {
            acc.push([]);
            prevMonth = currentMonth;
        }

        if (
            allowOverflow || (
                (!startDate || day.date >= startDate) &&
                (!endDate || day.date <= endDate)
            )
        ) {
            acc[acc.length - 1].push(day);
        }

        return acc;
    }, []);
}

/**
 * Divide a calendar into weeks.
 *
 * @param {Object}              options
 * @param {boolean}             options.allowOverflow
 * @param {Array<Object>}       options.calendar
 * @param {Date|string|number}  options.endDate
 * @param {Date|string|number}  options.startDate
 *
 * @return {Array<Array<Object>>} 
 */
function chunkWeeks({ allowOverflow, calendar, endDate, startDate }) {
    startDate = normalizeDate(startDate);
    endDate = normalizeDate(endDate);

    return calendar.reduce((acc, day, index) => {
        if (index % 7 === 0) {
            acc.push([]);
        }

        if (
            allowOverflow || (
                (!startDate || day.date >= startDate) &&
                (!endDate || day.date <= endDate)
            )
        ) {
            acc[acc.length - 1].push(day);
        }

        return acc;
    }, []);
}

/**
 * Determine the first day rendered on the heatmap.
 *
 * @param {Object}              props
 * @param {Array<string>}       props.colors
 * @param {Array<Object>}       props.data
 * @param {string}              props.emptyColor
 * @param {Date|number|string}  props.endDate
 * @param {Date|number|string}  props.startDate
 * @param {string}              props.view
 *
 * @return {Date}
 */
function getCalendar({ colors, data, emptyColor, endDate, startDate, view }) {
    startDate = startDate ? normalizeDate(startDate) : new Date();
    endDate = endDate ? normalizeDate(endDate) : new Date();

    if (view === 'monthly') {
        startDate = getMonthStart(startDate);
        endDate = getMonthEnd(endDate);
    } else {
        startDate = getWeekStart(startDate);
        endDate = getWeekEnd(endDate);
    }

    let max = 0;
    const startDayOfMonth = startDate.getDate();
    const totalDays = Math.floor((endDate - startDate) / 86400000) + 1; // 86400000 = 1000 * 60 * 60 * 24

    return new Array(totalDays)
        .fill()
        .map((x, offset) => {
            const day = getDay({ data, offset, startDate, startDayOfMonth });

            if (day.value > max) {
                max = day.value;
            }

            return day;
        })
        .map(({ date, value }) => {
            let color = getColor({ colors, max, value }) || emptyColor;

            return { color, date, value }
        });
}

/**
 * Determine what color a value should be.
 *
 * @param {options}         options
 * @param {Array<string>}   options.colors
 * @param {number}          options.max
 * @param {number}          options.value
 *
 * @return {string|null}
 */
function getColor({ colors, max, value }) {
    if (colors.length && value) {
        let color = colors[0];

        const intencity = value / max;

        for (let i = 1; i < colors.length; i++) {
            if (intencity < i / colors.length) {
                return color;
            }
            
            color = colors[i];
        }

        return colors[colors.length - 1];
    }

    return null;
}

/**
 * Aggregate the value of each day.
 *
 * @param {Object}          options
 * @param {Array<Object>}   options.data
 * @param {number}          options.offset
 * @param {number}          options.startDayOfMonth
 * @param {Date}            options.startDate
 *
 * @return {Object}
 */
function getDay({ data, offset, startDate, startDayOfMonth }) {
    const date = new Date(startDate);
    date.setDate(startDayOfMonth + offset);

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const value = data.reduce((acc, obj) => {
        const datapoint = normalizeDate(obj.date);

        return datapoint >= date && datapoint < nextDate ? acc + obj.value : acc;
    }, 0);

    return { date, value };
}

/* node_modules/svelte-heatmap/src/views/Cell.svelte generated by Svelte v3.32.3 */

function create_fragment(ctx) {
	let rect;
	let rect_data_date_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "data-date", rect_data_date_value = stringifyDate(/*date*/ ctx[1]));
			attr(rect, "data-value", /*value*/ ctx[4]);
			attr(rect, "fill", /*color*/ ctx[0]);
			attr(rect, "height", /*size*/ ctx[3]);
			attr(rect, "rx", /*radius*/ ctx[2]);
			attr(rect, "width", /*size*/ ctx[3]);
			attr(rect, "x", /*x*/ ctx[5]);
			attr(rect, "y", /*y*/ ctx[6]);
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*date*/ 2 && rect_data_date_value !== (rect_data_date_value = stringifyDate(/*date*/ ctx[1]))) {
				attr(rect, "data-date", rect_data_date_value);
			}

			if (dirty & /*value*/ 16) {
				attr(rect, "data-value", /*value*/ ctx[4]);
			}

			if (dirty & /*color*/ 1) {
				attr(rect, "fill", /*color*/ ctx[0]);
			}

			if (dirty & /*size*/ 8) {
				attr(rect, "height", /*size*/ ctx[3]);
			}

			if (dirty & /*radius*/ 4) {
				attr(rect, "rx", /*radius*/ ctx[2]);
			}

			if (dirty & /*size*/ 8) {
				attr(rect, "width", /*size*/ ctx[3]);
			}

			if (dirty & /*x*/ 32) {
				attr(rect, "x", /*x*/ ctx[5]);
			}

			if (dirty & /*y*/ 64) {
				attr(rect, "y", /*y*/ ctx[6]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(rect);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { color } = $$props;
	let { date } = $$props;
	let { radius } = $$props;
	let { size } = $$props;
	let { value } = $$props;
	let { x } = $$props;
	let { y } = $$props;

	$$self.$$set = $$props => {
		if ("color" in $$props) $$invalidate(0, color = $$props.color);
		if ("date" in $$props) $$invalidate(1, date = $$props.date);
		if ("radius" in $$props) $$invalidate(2, radius = $$props.radius);
		if ("size" in $$props) $$invalidate(3, size = $$props.size);
		if ("value" in $$props) $$invalidate(4, value = $$props.value);
		if ("x" in $$props) $$invalidate(5, x = $$props.x);
		if ("y" in $$props) $$invalidate(6, y = $$props.y);
	};

	return [color, date, radius, size, value, x, y];
}

class Cell extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			color: 0,
			date: 1,
			radius: 2,
			size: 3,
			value: 4,
			x: 5,
			y: 6
		});
	}
}

/* node_modules/svelte-heatmap/src/views/Month.svelte generated by Svelte v3.32.3 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

// (2:4) {#each days as day}
function create_each_block(ctx) {
	let cell;
	let current;

	cell = new Cell({
			props: {
				color: /*day*/ ctx[13].color,
				date: /*day*/ ctx[13].date,
				radius: /*cellRadius*/ ctx[0],
				size: /*cellSize*/ ctx[2],
				value: /*day*/ ctx[13].value,
				x: /*day*/ ctx[13].date.getDay() * /*cellRect*/ ctx[1],
				y: getWeekIndex(/*day*/ ctx[13].date) * /*cellRect*/ ctx[1] + /*monthLabelHeight*/ ctx[7]
			}
		});

	return {
		c() {
			create_component(cell.$$.fragment);
		},
		m(target, anchor) {
			mount_component(cell, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const cell_changes = {};
			if (dirty & /*days*/ 8) cell_changes.color = /*day*/ ctx[13].color;
			if (dirty & /*days*/ 8) cell_changes.date = /*day*/ ctx[13].date;
			if (dirty & /*cellRadius*/ 1) cell_changes.radius = /*cellRadius*/ ctx[0];
			if (dirty & /*cellSize*/ 4) cell_changes.size = /*cellSize*/ ctx[2];
			if (dirty & /*days*/ 8) cell_changes.value = /*day*/ ctx[13].value;
			if (dirty & /*days, cellRect*/ 10) cell_changes.x = /*day*/ ctx[13].date.getDay() * /*cellRect*/ ctx[1];
			if (dirty & /*days, cellRect, monthLabelHeight*/ 138) cell_changes.y = getWeekIndex(/*day*/ ctx[13].date) * /*cellRect*/ ctx[1] + /*monthLabelHeight*/ ctx[7];
			cell.$set(cell_changes);
		},
		i(local) {
			if (current) return;
			transition_in(cell.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(cell.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(cell, detaching);
		}
	};
}

// (13:4) {#if monthLabelHeight > 0}
function create_if_block(ctx) {
	let text_1;
	let t_value = /*monthLabels*/ ctx[8][/*days*/ ctx[3][0].date.getMonth()] + "";
	let t;

	return {
		c() {
			text_1 = svg_element("text");
			t = text(t_value);
			attr(text_1, "alignment-baseline", "hanging");
			attr(text_1, "fill", /*fontColor*/ ctx[4]);
			attr(text_1, "font-family", /*fontFamily*/ ctx[5]);
			attr(text_1, "font-size", /*fontSize*/ ctx[6]);
			attr(text_1, "x", "0");
			attr(text_1, "y", "0");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty & /*monthLabels, days*/ 264 && t_value !== (t_value = /*monthLabels*/ ctx[8][/*days*/ ctx[3][0].date.getMonth()] + "")) set_data(t, t_value);

			if (dirty & /*fontColor*/ 16) {
				attr(text_1, "fill", /*fontColor*/ ctx[4]);
			}

			if (dirty & /*fontFamily*/ 32) {
				attr(text_1, "font-family", /*fontFamily*/ ctx[5]);
			}

			if (dirty & /*fontSize*/ 64) {
				attr(text_1, "font-size", /*fontSize*/ ctx[6]);
			}
		},
		d(detaching) {
			if (detaching) detach(text_1);
		}
	};
}

function create_fragment$1(ctx) {
	let g;
	let each_1_anchor;
	let g_transform_value;
	let current;
	let each_value = /*days*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block = /*monthLabelHeight*/ ctx[7] > 0 && create_if_block(ctx);

	return {
		c() {
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			if (if_block) if_block.c();
			attr(g, "transform", g_transform_value = `translate(${/*translation*/ ctx[9]}, 0)`);
		},
		m(target, anchor) {
			insert(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}

			append(g, each_1_anchor);
			if (if_block) if_block.m(g, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*days, cellRadius, cellSize, cellRect, getWeekIndex, monthLabelHeight*/ 143) {
				each_value = /*days*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(g, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (/*monthLabelHeight*/ ctx[7] > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(g, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (!current || dirty & /*translation*/ 512 && g_transform_value !== (g_transform_value = `translate(${/*translation*/ ctx[9]}, 0)`)) {
				attr(g, "transform", g_transform_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(g);
			destroy_each(each_blocks, detaching);
			if (if_block) if_block.d();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let translation;
	let { cellGap } = $$props;
	let { cellRadius } = $$props;
	let { cellRect } = $$props;
	let { cellSize } = $$props;
	let { days } = $$props;
	let { fontColor } = $$props;
	let { fontFamily } = $$props;
	let { fontSize } = $$props;
	let { index } = $$props;
	let { monthGap } = $$props;
	let { monthLabelHeight } = $$props;
	let { monthLabels } = $$props;

	$$self.$$set = $$props => {
		if ("cellGap" in $$props) $$invalidate(10, cellGap = $$props.cellGap);
		if ("cellRadius" in $$props) $$invalidate(0, cellRadius = $$props.cellRadius);
		if ("cellRect" in $$props) $$invalidate(1, cellRect = $$props.cellRect);
		if ("cellSize" in $$props) $$invalidate(2, cellSize = $$props.cellSize);
		if ("days" in $$props) $$invalidate(3, days = $$props.days);
		if ("fontColor" in $$props) $$invalidate(4, fontColor = $$props.fontColor);
		if ("fontFamily" in $$props) $$invalidate(5, fontFamily = $$props.fontFamily);
		if ("fontSize" in $$props) $$invalidate(6, fontSize = $$props.fontSize);
		if ("index" in $$props) $$invalidate(11, index = $$props.index);
		if ("monthGap" in $$props) $$invalidate(12, monthGap = $$props.monthGap);
		if ("monthLabelHeight" in $$props) $$invalidate(7, monthLabelHeight = $$props.monthLabelHeight);
		if ("monthLabels" in $$props) $$invalidate(8, monthLabels = $$props.monthLabels);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*cellRect, cellGap, monthGap, index*/ 7170) {
			$$invalidate(9, translation = (7 * cellRect - cellGap + monthGap) * index);
		}
	};

	return [
		cellRadius,
		cellRect,
		cellSize,
		days,
		fontColor,
		fontFamily,
		fontSize,
		monthLabelHeight,
		monthLabels,
		translation,
		cellGap,
		index,
		monthGap
	];
}

class Month extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			cellGap: 10,
			cellRadius: 0,
			cellRect: 1,
			cellSize: 2,
			days: 3,
			fontColor: 4,
			fontFamily: 5,
			fontSize: 6,
			index: 11,
			monthGap: 12,
			monthLabelHeight: 7,
			monthLabels: 8
		});
	}
}

/* node_modules/svelte-heatmap/src/views/Week.svelte generated by Svelte v3.32.3 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[6] = i;
	return child_ctx;
}

// (2:4) {#each days as day, index}
function create_each_block$1(ctx) {
	let cell;
	let current;

	cell = new Cell({
			props: {
				color: /*day*/ ctx[7].color,
				date: /*day*/ ctx[7].date,
				radius: /*cellRadius*/ ctx[0],
				size: /*cellSize*/ ctx[2],
				value: /*day*/ ctx[7].value,
				y: /*day*/ ctx[7].date.getDay() * /*cellRect*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(cell.$$.fragment);
		},
		m(target, anchor) {
			mount_component(cell, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const cell_changes = {};
			if (dirty & /*days*/ 8) cell_changes.color = /*day*/ ctx[7].color;
			if (dirty & /*days*/ 8) cell_changes.date = /*day*/ ctx[7].date;
			if (dirty & /*cellRadius*/ 1) cell_changes.radius = /*cellRadius*/ ctx[0];
			if (dirty & /*cellSize*/ 4) cell_changes.size = /*cellSize*/ ctx[2];
			if (dirty & /*days*/ 8) cell_changes.value = /*day*/ ctx[7].value;
			if (dirty & /*days, cellRect*/ 10) cell_changes.y = /*day*/ ctx[7].date.getDay() * /*cellRect*/ ctx[1];
			cell.$set(cell_changes);
		},
		i(local) {
			if (current) return;
			transition_in(cell.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(cell.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(cell, detaching);
		}
	};
}

function create_fragment$2(ctx) {
	let g;
	let g_transform_value;
	let current;
	let each_value = /*days*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(g, "transform", g_transform_value = `translate(${/*translation*/ ctx[5]}, ${/*monthLabelHeight*/ ctx[4]})`);
		},
		m(target, anchor) {
			insert(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*days, cellRadius, cellSize, cellRect*/ 15) {
				each_value = /*days*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(g, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*translation, monthLabelHeight*/ 48 && g_transform_value !== (g_transform_value = `translate(${/*translation*/ ctx[5]}, ${/*monthLabelHeight*/ ctx[4]})`)) {
				attr(g, "transform", g_transform_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(g);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let translation;
	let { cellRadius } = $$props;
	let { cellRect } = $$props;
	let { cellSize } = $$props;
	let { days } = $$props;
	let { index } = $$props;
	let { monthLabelHeight } = $$props;

	$$self.$$set = $$props => {
		if ("cellRadius" in $$props) $$invalidate(0, cellRadius = $$props.cellRadius);
		if ("cellRect" in $$props) $$invalidate(1, cellRect = $$props.cellRect);
		if ("cellSize" in $$props) $$invalidate(2, cellSize = $$props.cellSize);
		if ("days" in $$props) $$invalidate(3, days = $$props.days);
		if ("index" in $$props) $$invalidate(6, index = $$props.index);
		if ("monthLabelHeight" in $$props) $$invalidate(4, monthLabelHeight = $$props.monthLabelHeight);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*cellRect, index*/ 66) {
			$$invalidate(5, translation = cellRect * index);
		}
	};

	return [cellRadius, cellRect, cellSize, days, monthLabelHeight, translation, index];
}

class Week extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			cellRadius: 0,
			cellRect: 1,
			cellSize: 2,
			days: 3,
			index: 6,
			monthLabelHeight: 4
		});
	}
}

/* node_modules/svelte-heatmap/src/SvelteHeatmap.svelte generated by Svelte v3.32.3 */

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i];
	child_ctx[28] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[30] = list[i];
	child_ctx[28] = i;
	return child_ctx;
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i];
	child_ctx[28] = i;
	return child_ctx;
}

// (19:4) {:else}
function create_else_block(ctx) {
	let g;
	let g_transform_value;
	let current;
	let if_block = /*dayLabelWidth*/ ctx[3] > 0 && create_if_block_2(ctx);
	let each_value_1 = /*chunks*/ ctx[13];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			if (if_block) if_block.c();
			g = svg_element("g");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(g, "transform", g_transform_value = `translate(${/*dayLabelWidth*/ ctx[3]})`);
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, g, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(g, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (/*dayLabelWidth*/ ctx[3] > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(g.parentNode, g);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*fontColor, fontFamily, fontSize, cellRect, monthLabels, chunks, monthLabelHeight, isNewMonth, cellRadius, cellSize*/ 145126) {
				each_value_1 = /*chunks*/ ctx[13];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(g, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty[0] & /*dayLabelWidth*/ 8 && g_transform_value !== (g_transform_value = `translate(${/*dayLabelWidth*/ ctx[3]})`)) {
				attr(g, "transform", g_transform_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(g);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (2:4) {#if view === 'monthly'}
function create_if_block$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*chunks*/ ctx[13];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*cellGap, cellRadius, cellRect, cellSize, chunks, fontColor, fontFamily, fontSize, monthGap, monthLabelHeight, monthLabels*/ 14311) {
				each_value = /*chunks*/ ctx[13];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (20:8) {#if dayLabelWidth > 0}
function create_if_block_2(ctx) {
	let each_1_anchor;
	let each_value_2 = /*dayLabels*/ ctx[4];
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*fontColor, fontFamily, fontSize, dayLabelPosition, dayLabels*/ 65776) {
				each_value_2 = /*dayLabels*/ ctx[4];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (21:12) {#each dayLabels as label, index}
function create_each_block_2(ctx) {
	let text_1;
	let t_value = /*label*/ ctx[30] + "";
	let t;
	let text_1_y_value;

	return {
		c() {
			text_1 = svg_element("text");
			t = text(t_value);
			attr(text_1, "alignment-baseline", "middle");
			attr(text_1, "fill", /*fontColor*/ ctx[5]);
			attr(text_1, "font-family", /*fontFamily*/ ctx[6]);
			attr(text_1, "font-size", /*fontSize*/ ctx[7]);
			attr(text_1, "x", "0");
			attr(text_1, "y", text_1_y_value = /*dayLabelPosition*/ ctx[16](/*index*/ ctx[28]));
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*dayLabels*/ 16 && t_value !== (t_value = /*label*/ ctx[30] + "")) set_data(t, t_value);

			if (dirty[0] & /*fontColor*/ 32) {
				attr(text_1, "fill", /*fontColor*/ ctx[5]);
			}

			if (dirty[0] & /*fontFamily*/ 64) {
				attr(text_1, "font-family", /*fontFamily*/ ctx[6]);
			}

			if (dirty[0] & /*fontSize*/ 128) {
				attr(text_1, "font-size", /*fontSize*/ ctx[7]);
			}

			if (dirty[0] & /*dayLabelPosition*/ 65536 && text_1_y_value !== (text_1_y_value = /*dayLabelPosition*/ ctx[16](/*index*/ ctx[28]))) {
				attr(text_1, "y", text_1_y_value);
			}
		},
		d(detaching) {
			if (detaching) detach(text_1);
		}
	};
}

// (43:16) {#if monthLabelHeight > 0 && isNewMonth(chunks, index)}
function create_if_block_1(ctx) {
	let text_1;
	let t_value = /*monthLabels*/ ctx[10][/*chunk*/ ctx[26][0].date.getMonth()] + "";
	let t;
	let text_1_x_value;

	return {
		c() {
			text_1 = svg_element("text");
			t = text(t_value);
			attr(text_1, "alignment-baseline", "hanging");
			attr(text_1, "fill", /*fontColor*/ ctx[5]);
			attr(text_1, "font-family", /*fontFamily*/ ctx[6]);
			attr(text_1, "font-size", /*fontSize*/ ctx[7]);
			attr(text_1, "x", text_1_x_value = /*cellRect*/ ctx[12] * /*index*/ ctx[28]);
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*monthLabels, chunks*/ 9216 && t_value !== (t_value = /*monthLabels*/ ctx[10][/*chunk*/ ctx[26][0].date.getMonth()] + "")) set_data(t, t_value);

			if (dirty[0] & /*fontColor*/ 32) {
				attr(text_1, "fill", /*fontColor*/ ctx[5]);
			}

			if (dirty[0] & /*fontFamily*/ 64) {
				attr(text_1, "font-family", /*fontFamily*/ ctx[6]);
			}

			if (dirty[0] & /*fontSize*/ 128) {
				attr(text_1, "font-size", /*fontSize*/ ctx[7]);
			}

			if (dirty[0] & /*cellRect*/ 4096 && text_1_x_value !== (text_1_x_value = /*cellRect*/ ctx[12] * /*index*/ ctx[28])) {
				attr(text_1, "x", text_1_x_value);
			}
		},
		d(detaching) {
			if (detaching) detach(text_1);
		}
	};
}

// (34:12) {#each chunks as chunk, index}
function create_each_block_1(ctx) {
	let week;
	let show_if = /*monthLabelHeight*/ ctx[9] > 0 && /*isNewMonth*/ ctx[17](/*chunks*/ ctx[13], /*index*/ ctx[28]);
	let if_block_anchor;
	let current;

	week = new Week({
			props: {
				cellRadius: /*cellRadius*/ ctx[1],
				cellRect: /*cellRect*/ ctx[12],
				cellSize: /*cellSize*/ ctx[2],
				days: /*chunk*/ ctx[26],
				index: /*index*/ ctx[28],
				monthLabelHeight: /*monthLabelHeight*/ ctx[9]
			}
		});

	let if_block = show_if && create_if_block_1(ctx);

	return {
		c() {
			create_component(week.$$.fragment);
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			mount_component(week, target, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const week_changes = {};
			if (dirty[0] & /*cellRadius*/ 2) week_changes.cellRadius = /*cellRadius*/ ctx[1];
			if (dirty[0] & /*cellRect*/ 4096) week_changes.cellRect = /*cellRect*/ ctx[12];
			if (dirty[0] & /*cellSize*/ 4) week_changes.cellSize = /*cellSize*/ ctx[2];
			if (dirty[0] & /*chunks*/ 8192) week_changes.days = /*chunk*/ ctx[26];
			if (dirty[0] & /*monthLabelHeight*/ 512) week_changes.monthLabelHeight = /*monthLabelHeight*/ ctx[9];
			week.$set(week_changes);
			if (dirty[0] & /*monthLabelHeight, chunks*/ 8704) show_if = /*monthLabelHeight*/ ctx[9] > 0 && /*isNewMonth*/ ctx[17](/*chunks*/ ctx[13], /*index*/ ctx[28]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(week.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(week.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(week, detaching);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (3:8) {#each chunks as chunk, index}
function create_each_block$2(ctx) {
	let month;
	let current;

	month = new Month({
			props: {
				cellGap: /*cellGap*/ ctx[0],
				cellRadius: /*cellRadius*/ ctx[1],
				cellRect: /*cellRect*/ ctx[12],
				cellSize: /*cellSize*/ ctx[2],
				days: /*chunk*/ ctx[26],
				fontColor: /*fontColor*/ ctx[5],
				fontFamily: /*fontFamily*/ ctx[6],
				fontSize: /*fontSize*/ ctx[7],
				index: /*index*/ ctx[28],
				monthGap: /*monthGap*/ ctx[8],
				monthLabelHeight: /*monthLabelHeight*/ ctx[9],
				monthLabels: /*monthLabels*/ ctx[10]
			}
		});

	return {
		c() {
			create_component(month.$$.fragment);
		},
		m(target, anchor) {
			mount_component(month, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const month_changes = {};
			if (dirty[0] & /*cellGap*/ 1) month_changes.cellGap = /*cellGap*/ ctx[0];
			if (dirty[0] & /*cellRadius*/ 2) month_changes.cellRadius = /*cellRadius*/ ctx[1];
			if (dirty[0] & /*cellRect*/ 4096) month_changes.cellRect = /*cellRect*/ ctx[12];
			if (dirty[0] & /*cellSize*/ 4) month_changes.cellSize = /*cellSize*/ ctx[2];
			if (dirty[0] & /*chunks*/ 8192) month_changes.days = /*chunk*/ ctx[26];
			if (dirty[0] & /*fontColor*/ 32) month_changes.fontColor = /*fontColor*/ ctx[5];
			if (dirty[0] & /*fontFamily*/ 64) month_changes.fontFamily = /*fontFamily*/ ctx[6];
			if (dirty[0] & /*fontSize*/ 128) month_changes.fontSize = /*fontSize*/ ctx[7];
			if (dirty[0] & /*monthGap*/ 256) month_changes.monthGap = /*monthGap*/ ctx[8];
			if (dirty[0] & /*monthLabelHeight*/ 512) month_changes.monthLabelHeight = /*monthLabelHeight*/ ctx[9];
			if (dirty[0] & /*monthLabels*/ 1024) month_changes.monthLabels = /*monthLabels*/ ctx[10];
			month.$set(month_changes);
		},
		i(local) {
			if (current) return;
			transition_in(month.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(month.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(month, detaching);
		}
	};
}

function create_fragment$3(ctx) {
	let svg;
	let current_block_type_index;
	let if_block;
	let svg_viewBox_value;
	let current;
	const if_block_creators = [create_if_block$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*view*/ ctx[11] === "monthly") return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			svg = svg_element("svg");
			if_block.c();
			attr(svg, "viewBox", svg_viewBox_value = `0 0 ${/*width*/ ctx[15]} ${/*height*/ ctx[14]}`);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			if_blocks[current_block_type_index].m(svg, null);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(svg, null);
			}

			if (!current || dirty[0] & /*width, height*/ 49152 && svg_viewBox_value !== (svg_viewBox_value = `0 0 ${/*width*/ ctx[15]} ${/*height*/ ctx[14]}`)) {
				attr(svg, "viewBox", svg_viewBox_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let cellRect;
	let calendar;
	let chunks;
	let weekRect;
	let height;
	let width;
	let dayLabelPosition;
	let { allowOverflow = false } = $$props;
	let { cellGap = 2 } = $$props;
	let { cellRadius = 0 } = $$props;
	let { cellSize = 10 } = $$props;
	let { colors = ["#c6e48b", "#7bc96f", "#239a3b", "#196127"] } = $$props;
	let { data = [] } = $$props;
	let { dayLabelWidth = 20 } = $$props;
	let { dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""] } = $$props;
	let { emptyColor = "#ebedf0" } = $$props;
	let { endDate = null } = $$props;
	let { fontColor = "#333" } = $$props;
	let { fontFamily = "sans-serif" } = $$props;
	let { fontSize = 8 } = $$props;
	let { monthGap = 2 } = $$props;
	let { monthLabelHeight = 12 } = $$props;

	let { monthLabels = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	] } = $$props;

	let { startDate = null } = $$props;
	let { view = "weekly" } = $$props;

	const isNewMonth = (chunks, index) => {
		const chunk = chunks[index];
		const prev = chunks[index - 1];

		if (!prev) {
			return true;
		}

		if (!prev.length || !chunk.length) {
			return false;
		}

		const currentIndex = chunk[0].date.getMonth();
		const prevIndex = prev[0].date.getMonth();
		return index < chunks.length && index < chunks.length - 1 && (currentIndex > prevIndex || currentIndex === 0 && prevIndex === 11);
	};

	$$self.$$set = $$props => {
		if ("allowOverflow" in $$props) $$invalidate(18, allowOverflow = $$props.allowOverflow);
		if ("cellGap" in $$props) $$invalidate(0, cellGap = $$props.cellGap);
		if ("cellRadius" in $$props) $$invalidate(1, cellRadius = $$props.cellRadius);
		if ("cellSize" in $$props) $$invalidate(2, cellSize = $$props.cellSize);
		if ("colors" in $$props) $$invalidate(19, colors = $$props.colors);
		if ("data" in $$props) $$invalidate(20, data = $$props.data);
		if ("dayLabelWidth" in $$props) $$invalidate(3, dayLabelWidth = $$props.dayLabelWidth);
		if ("dayLabels" in $$props) $$invalidate(4, dayLabels = $$props.dayLabels);
		if ("emptyColor" in $$props) $$invalidate(21, emptyColor = $$props.emptyColor);
		if ("endDate" in $$props) $$invalidate(22, endDate = $$props.endDate);
		if ("fontColor" in $$props) $$invalidate(5, fontColor = $$props.fontColor);
		if ("fontFamily" in $$props) $$invalidate(6, fontFamily = $$props.fontFamily);
		if ("fontSize" in $$props) $$invalidate(7, fontSize = $$props.fontSize);
		if ("monthGap" in $$props) $$invalidate(8, monthGap = $$props.monthGap);
		if ("monthLabelHeight" in $$props) $$invalidate(9, monthLabelHeight = $$props.monthLabelHeight);
		if ("monthLabels" in $$props) $$invalidate(10, monthLabels = $$props.monthLabels);
		if ("startDate" in $$props) $$invalidate(23, startDate = $$props.startDate);
		if ("view" in $$props) $$invalidate(11, view = $$props.view);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*cellSize, cellGap*/ 5) {
			$$invalidate(12, cellRect = cellSize + cellGap);
		}

		if ($$self.$$.dirty[0] & /*allowOverflow, colors, data, emptyColor, endDate, startDate, view*/ 16517120) {
			$$invalidate(24, calendar = getCalendar({
				allowOverflow,
				colors,
				data,
				emptyColor,
				endDate,
				startDate,
				view
			}));
		}

		if ($$self.$$.dirty[0] & /*view, allowOverflow, calendar, endDate, startDate*/ 29624320) {
			$$invalidate(13, chunks = view === "monthly"
			? chunkMonths({
					allowOverflow,
					calendar,
					endDate,
					startDate
				})
			: chunkWeeks({
					allowOverflow,
					calendar,
					endDate,
					startDate
				}));
		}

		if ($$self.$$.dirty[0] & /*cellRect, cellGap*/ 4097) {
			$$invalidate(25, weekRect = 7 * cellRect - cellGap);
		}

		if ($$self.$$.dirty[0] & /*view, cellRect, cellGap, monthLabelHeight, weekRect*/ 33561089) {
			$$invalidate(14, height = view === "monthly"
			? 6 * cellRect - cellGap + monthLabelHeight
			: weekRect + monthLabelHeight); // <- max of 6 rows in monthly view
		}

		if ($$self.$$.dirty[0] & /*view, weekRect, monthGap, chunks, cellRect, cellGap, dayLabelWidth*/ 33569033) {
			$$invalidate(15, width = view === "monthly"
			? (weekRect + monthGap) * chunks.length - monthGap
			: cellRect * chunks.length - cellGap + dayLabelWidth);
		}

		if ($$self.$$.dirty[0] & /*cellRect, monthLabelHeight*/ 4608) {
			$$invalidate(16, dayLabelPosition = index => {
				return cellRect * index + cellRect / 2 + monthLabelHeight;
			});
		}
	};

	return [
		cellGap,
		cellRadius,
		cellSize,
		dayLabelWidth,
		dayLabels,
		fontColor,
		fontFamily,
		fontSize,
		monthGap,
		monthLabelHeight,
		monthLabels,
		view,
		cellRect,
		chunks,
		height,
		width,
		dayLabelPosition,
		isNewMonth,
		allowOverflow,
		colors,
		data,
		emptyColor,
		endDate,
		startDate,
		calendar,
		weekRect
	];
}

class SvelteHeatmap extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$3,
			create_fragment$3,
			safe_not_equal,
			{
				allowOverflow: 18,
				cellGap: 0,
				cellRadius: 1,
				cellSize: 2,
				colors: 19,
				data: 20,
				dayLabelWidth: 3,
				dayLabels: 4,
				emptyColor: 21,
				endDate: 22,
				fontColor: 5,
				fontFamily: 6,
				fontSize: 7,
				monthGap: 8,
				monthLabelHeight: 9,
				monthLabels: 10,
				startDate: 23,
				view: 11
			},
			[-1, -1]
		);
	}
}

SvelteHeatmap.VERSION = '1.0.2';

/* src/svelte/ActivityHeatmap.svelte generated by Svelte v3.32.3 */

function create_fragment$4(ctx) {
	let svelteheatmap;
	let current;

	svelteheatmap = new SvelteHeatmap({
			props: {
				data: /*data*/ ctx[0],
				view: /*type*/ ctx[5],
				startDate: /*startDate*/ ctx[7],
				endDate: /*endDate*/ ctx[8],
				monthLabels: /*monthlabel*/ ctx[6],
				allowOverflow: "true",
				colors: /*colors*/ ctx[1],
				fontColor: /*textColor*/ ctx[2],
				emptyColor: /*emptyColor*/ ctx[3],
				cellRadius: /*cellRadius*/ ctx[4]
			}
		});

	return {
		c() {
			create_component(svelteheatmap.$$.fragment);
		},
		m(target, anchor) {
			mount_component(svelteheatmap, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const svelteheatmap_changes = {};
			if (dirty & /*data*/ 1) svelteheatmap_changes.data = /*data*/ ctx[0];
			if (dirty & /*type*/ 32) svelteheatmap_changes.view = /*type*/ ctx[5];
			if (dirty & /*monthlabel*/ 64) svelteheatmap_changes.monthLabels = /*monthlabel*/ ctx[6];
			if (dirty & /*colors*/ 2) svelteheatmap_changes.colors = /*colors*/ ctx[1];
			if (dirty & /*textColor*/ 4) svelteheatmap_changes.fontColor = /*textColor*/ ctx[2];
			if (dirty & /*emptyColor*/ 8) svelteheatmap_changes.emptyColor = /*emptyColor*/ ctx[3];
			if (dirty & /*cellRadius*/ 16) svelteheatmap_changes.cellRadius = /*cellRadius*/ ctx[4];
			svelteheatmap.$set(svelteheatmap_changes);
		},
		i(local) {
			if (current) return;
			transition_in(svelteheatmap.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(svelteheatmap.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(svelteheatmap, detaching);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { year } = $$props;
	let { data } = $$props;
	let { colors = ["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"] } = $$props;
	let { textColor } = $$props;
	let { emptyColor = "#ecedf0" } = $$props;
	let { cellRadius = 1 } = $$props;
	let { type = "yearly" } = $$props;
	let startDate = `${year}/01/01`;
	let endDate = `${year}/12/31`;

	let monthlabel = [
		"",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];

	if (type == "monthly") {
		monthlabel = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
	}

	$$self.$$set = $$props => {
		if ("year" in $$props) $$invalidate(9, year = $$props.year);
		if ("data" in $$props) $$invalidate(0, data = $$props.data);
		if ("colors" in $$props) $$invalidate(1, colors = $$props.colors);
		if ("textColor" in $$props) $$invalidate(2, textColor = $$props.textColor);
		if ("emptyColor" in $$props) $$invalidate(3, emptyColor = $$props.emptyColor);
		if ("cellRadius" in $$props) $$invalidate(4, cellRadius = $$props.cellRadius);
		if ("type" in $$props) $$invalidate(5, type = $$props.type);
	};

	return [
		data,
		colors,
		textColor,
		emptyColor,
		cellRadius,
		type,
		monthlabel,
		startDate,
		endDate,
		year
	];
}

class ActivityHeatmap extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			year: 9,
			data: 0,
			colors: 1,
			textColor: 2,
			emptyColor: 3,
			cellRadius: 4,
			type: 5
		});
	}
}

/* src/svelte/SelectYear.svelte generated by Svelte v3.32.3 */

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	child_ctx[6] = i;
	return child_ctx;
}

// (8:2) {#each options as option, i}
function create_each_block$3(ctx) {
	let option;
	let t_value = /*display_func*/ ctx[2](/*option*/ ctx[4]) + "";
	let t;

	return {
		c() {
			option = element("option");
			t = text(t_value);
			option.__value = /*i*/ ctx[6];
			option.value = option.__value;
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t);
		},
		p(ctx, dirty) {
			if (dirty & /*display_func, options*/ 6 && t_value !== (t_value = /*display_func*/ ctx[2](/*option*/ ctx[4]) + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

function create_fragment$5(ctx) {
	let select;
	let mounted;
	let dispose;
	let each_value = /*options*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	return {
		c() {
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(select, "class", "selectYear");
			if (/*index*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[3].call(select));
		},
		m(target, anchor) {
			insert(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			select_option(select, /*index*/ ctx[0]);

			if (!mounted) {
				dispose = listen(select, "change", /*select_change_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*display_func, options*/ 6) {
				each_value = /*options*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*index*/ 1) {
				select_option(select, /*index*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(select);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { options = [] } = $$props;
	let { display_func = value => value } = $$props;
	let { index = 0 } = $$props;

	function select_change_handler() {
		index = select_value(this);
		$$invalidate(0, index);
	}

	$$self.$$set = $$props => {
		if ("options" in $$props) $$invalidate(1, options = $$props.options);
		if ("display_func" in $$props) $$invalidate(2, display_func = $$props.display_func);
		if ("index" in $$props) $$invalidate(0, index = $$props.index);
	};

	return [index, options, display_func, select_change_handler];
}

class SelectYear extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { options: 1, display_func: 2, index: 0 });
	}
}

/* src/svelte/Year.svelte generated by Svelte v3.32.3 */

function create_fragment$6(ctx) {
	let div;
	let selectyear;
	let updating_value;
	let current;

	function selectyear_value_binding(value) {
		/*selectyear_value_binding*/ ctx[2](value);
	}

	let selectyear_props = {
		options: /*options*/ ctx[0],
		display_func: func
	};

	if (/*selected*/ ctx[1] !== void 0) {
		selectyear_props.value = /*selected*/ ctx[1];
	}

	selectyear = new SelectYear({ props: selectyear_props });
	binding_callbacks.push(() => bind(selectyear, "value", selectyear_value_binding));

	return {
		c() {
			div = element("div");
			create_component(selectyear.$$.fragment);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(selectyear, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const selectyear_changes = {};
			if (dirty & /*options*/ 1) selectyear_changes.options = /*options*/ ctx[0];

			if (!updating_value && dirty & /*selected*/ 2) {
				updating_value = true;
				selectyear_changes.value = /*selected*/ ctx[1];
				add_flush_callback(() => updating_value = false);
			}

			selectyear.$set(selectyear_changes);
		},
		i(local) {
			if (current) return;
			transition_in(selectyear.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(selectyear.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(selectyear);
		}
	};
}

const func = o => o.year;

function instance$6($$self, $$props, $$invalidate) {
	let { options = [
		{
			year: new Date().getFullYear().toString()
		}
	] } = $$props;

	let selected;

	function selectyear_value_binding(value) {
		selected = value;
		$$invalidate(1, selected);
	}

	$$self.$$set = $$props => {
		if ("options" in $$props) $$invalidate(0, options = $$props.options);
	};

	return [options, selected, selectyear_value_binding];
}

class Year extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { options: 0 });
	}
}

class ActivityHistoryProcessor {
    async run(source, el, settings) {
        var _a;
        source = source.trim();
        let currentYear = new Date().getFullYear().toString();
        let elCanvas = el.createDiv({ cls: 'ObsidianHistoryBlock' });
        let yearSelect = elCanvas.createDiv({ attr: { id: 'SelectYear' } });
        let boardEL = elCanvas.createDiv({ cls: 'HistoryBoard', attr: { id: 'HistoryBoard' } });
        // Check if project is being tracked
        if (!isTracked(source, settings.trackedProjects)) {
            // Show warning message
            boardEL.setText(`Specified project ${source} is not a tracked project.`);
            return;
        }
        // Valid project, add the different svelte component
        // Get year ranges for the specified object
        let yearRange = getYearRange(source, settings.activityHistory);
        // Add current year to the selection
        if (yearRange.every(x => x.year != currentYear)) {
            yearRange.unshift({ year: currentYear });
        }
        // Add svelte year selection element
        new Year({
            props: {
                options: yearRange,
            },
            target: yearSelect
        });
        // Get activity history for specified project
        let activity = (_a = getProjectActivityHistory(source, settings.activityHistory)) === null || _a === void 0 ? void 0 : _a.size;
        // if no activity history available add placeholder
        if (!activity) {
            activity = [{ date: `${currentYear}-01-01`, value: 0 }];
        }
        // Add svelte activity heatmap element
        new ActivityHeatmap({
            props: {
                year: new Date().getFullYear().toString(),
                data: activity,
                colors: [settings.activityColor1, settings.activityColor2, settings.activityColor3, settings.activityColor4],
                textColor: settings.textColor,
                emptyColor: settings.emptyColor,
                cellRadius: settings.cellRadius,
                type: settings.type
            },
            target: boardEL
        });
        // Add listener to update heatmap on Year Selection change
        yearSelect.addEventListener('change', (event) => {
            // Get selected year
            let selectOption = yearSelect.querySelectorAll('option:checked')[0].innerHTML;
            // Update the activity heatmap
            boardEL.empty();
            new ActivityHeatmap({
                props: {
                    year: selectOption,
                    data: activity,
                    colors: [settings.activityColor1, settings.activityColor2, settings.activityColor3, settings.activityColor4],
                    textColor: settings.textColor,
                    emptyColor: settings.emptyColor,
                    cellRadius: settings.cellRadius
                },
                target: boardEL
            });
        });
        el.appendChild(elCanvas);
    }
}

const DEFAULT_SETTINGS = {
    firstRun: true,
    initialized: [{ path: '/', initialized: false }],
    trackedProjects: ['/'],
    checkpointList: [{ path: '/', date: getTimestamp(), size: 0 }],
    activityHistory: [{ path: '/', size: [{ date: getTimestamp(), value: 0 }] }],
    activityColor1: '#c6e48b',
    activityColor2: '#7bc96f',
    activityColor3: '#239a3b',
    activityColor4: '#196127',
    textColor: '#000000',
    emptyColor: '#ecedf0',
    cellRadius: 1,
    type: 'yearly'
};

class ActivityHistoryPlugin extends obsidian.Plugin {
    async onload() {
        // Load message
        await this.loadSettings();
        console.log('Loaded Activity Plugin');
        // Register activity history block renderer
        this.registerMarkdownCodeBlockProcessor('ActivityHistory', async (source, el, ctx) => {
            const proc = new ActivityHistoryProcessor();
            await proc.run(source, el, this.settings);
        });
        // Update all tracked projects on events
        setInterval(() => {
            if (this.settings.firstRun) {
                removeProject('/', this.settings);
                addProject('/', this.settings, this.app.vault.getMarkdownFiles());
                this.settings.firstRun = false;
                this.saveSettings();
            }
            updateActivityAll(this.settings, this.app.vault.getMarkdownFiles());
            this.saveSettings();
        }, 200000);
        this.addSettingTab(new ActivityHistorySettingTab(this.app, this));
    }
    onunload() {
        console.log('unloading activity plugin');
    }
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }
    async saveSettings() {
        await this.saveData(this.settings);
    }
}

module.exports = ActivityHistoryPlugin;
