// Material Design Library
// @license
// MIT

// @author
// Oarabile Koore

// @version
// 2.0.0

function MaterialDesign() {
    this.Initialize = function (defaultTheme, defaultIcons) {
        mdui_initialize(defaultTheme, defaultIcons);
    };

    this.SetTheme = function (theme) {
        themeSignal.value = theme;
    };

    this.GetTheme = function () {
        return themeSignal.value;
    };

    this.CreateLayout = function (type, options) {
        return new mdui_layout(type, options);
    };

    this.AddLayout = function (layout, type, options) {
        return new mdui_layout(type, options, layout);
    };

    this.CreateButton = function (text, width, height, options) {
        return new mdui_button(text, width, height, options);
    };

    this.AddButton = function (layout, text, width, height, options) {
        return new mdui_button(text, width, height, options, layout);
    };

    this.SnackBar = function (text, action_text, alignment) {
        return new mdui_snackbar(text, action_text, alignment);
    };
}

const mdui = new MaterialDesign();

// create a state managment tactic for switching theme modes

function createSignal(defaultValue) {
    let internal_value = defaultValue;
    let subscribers = [];

    function notify() {
        for (let subscriber of subscribers) {
            subscriber(internal_value);
        }
    }

    return {
        get value() {
            return internal_value;
        },
        set value(newVariable) {
            internal_value = newVariable;
            notify();
        },

        subscribe: (subscriber) => {
            subscribers.push(subscriber);
        },
    };
}

function mdui_initialize(defaultTheme, defaultIcons) {
    // check if a baseTheme file is provided, if not warn the dev
    // globalise themes

    if (app.FileExists("material-theme.json")) {
        window.themeSignal = createSignal(defaultTheme);

        themeSignal.subscribe((theme) => {
            window.defaultTheme = theme;
            extract_base_colors();
        });

        window.defaultTheme = themeSignal.value;
        window.defaultIcons = defaultIcons;
        extract_base_colors();
    } else {
        throw Error("json baseTheme File Not Provided");
    }
}

function extract_base_colors() {
    let materialFile = app.ReadFile("material-theme.json", "UTF-8");

    let materialJsonData = JSON.parse(materialFile);

    function getColorHexCode(colorName) {
        const colorScheme = materialJsonData.schemes[defaultTheme];
        return colorScheme[colorName];
    }

    mdui.statusColor = materialJsonData.schemes.dark.background;

    mdui.primary = getColorHexCode("primary");
    mdui.surfaceTint = getColorHexCode("surfaceTint");
    mdui.onPrimary = getColorHexCode("onPrimary");
    mdui.primaryContainer = getColorHexCode("primaryContainer");
    mdui.onPrimaryContainer = getColorHexCode("onPrimaryContainer");
    mdui.secondary = getColorHexCode("secondary");
    mdui.onSecondary = getColorHexCode("onSecondary");
    mdui.secondaryContainer = getColorHexCode("secondaryContainer");
    mdui.onSecondaryContainer = getColorHexCode("onSecondaryContainer");
    mdui.tertiary = getColorHexCode("tertiary");
    mdui.onTertiary = getColorHexCode("onTertiary");
    mdui.tertiaryContainer = getColorHexCode("tertiaryContainer");
    mdui.onTertiaryContainer = getColorHexCode("onTertiaryContainer");
    mdui.error = getColorHexCode("error");
    mdui.onError = getColorHexCode("onError");
    mdui.errorContainer = getColorHexCode("errorContainer");
    mdui.onErrorContainer = getColorHexCode("onErrorContainer");
    mdui.background = getColorHexCode("background");
    mdui.onBackground = getColorHexCode("onBackground");
    mdui.surface = getColorHexCode("surface");
    mdui.onSurface = getColorHexCode("onSurface");
    mdui.surfaceVariant = getColorHexCode("surfaceVariant");
    mdui.onSurfaceVariant = getColorHexCode("onSurfaceVariant");
    mdui.outline = getColorHexCode("outline");
    mdui.outlineVariant = getColorHexCode("outlineVariant");
    mdui.shadow = getColorHexCode("shadow");
    mdui.scrim = getColorHexCode("scrim");
    mdui.inverseSurface = getColorHexCode("inverseSurface");
    mdui.inverseOnSurface = getColorHexCode("inverseOnSurface");
    mdui.inversePrimary = getColorHexCode("inversePrimary");
    mdui.primaryFixed = getColorHexCode("primaryFixed");
    mdui.onPrimaryFixed = getColorHexCode("onPrimaryFixed");
    mdui.primaryFixedDim = getColorHexCode("primaryFixedDim");
    mdui.onPrimaryFixedVariant = getColorHexCode("onPrimaryFixedVariant");
    mdui.secondaryFixed = getColorHexCode("secondaryFixed");
    mdui.onSecondaryFixed = getColorHexCode("onSecondaryFixed");
    mdui.secondaryFixedDim = getColorHexCode("secondaryFixedDim");
    mdui.onSecondaryFixedVariant = getColorHexCode("onSecondaryFixedVariant");
    mdui.tertiaryFixed = getColorHexCode("tertiaryFixed");
    mdui.onTertiaryFixed = getColorHexCode("onTertiaryFixed");
    mdui.tertiaryFixedDim = getColorHexCode("tertiaryFixedDim");
    mdui.onTertiaryFixedVariant = getColorHexCode("onTertiaryFixedVariant");
    mdui.surfaceDim = getColorHexCode("surfaceDim");
    mdui.surfaceBright = getColorHexCode("surfaceBright");
    mdui.surfaceContainerLowest = getColorHexCode("surfaceContainerLowest");
    mdui.surfaceContainerLow = getColorHexCode("surfaceContainerLow");
    mdui.surfaceContainer = getColorHexCode("surfaceContainer");
    mdui.surfaceContainerHigh = getColorHexCode("surfaceContainerHigh");
    mdui.surfaceContainerHighest = getColorHexCode("surfaceContainerHighest");
}

function mdui_layout(type, options, layout) {
    // if layout is true use AddLayout else use CreateLayout
    // set statusBar to md color
    // set backgroundColor too

    app.SetStatusBarColor(mdui.statusColor);

    if (layout) {
        let layout = app.AddLayout(layout, type, options);
        layout.SetBackColor(mdui.background);

        // subscribe to the signal, to respond to mode changes
        themeSignal.subscribe(() => {
            layout.SetBackColor(mdui.background);
        });
        return layout;
    } else {
        let layout = app.CreateLayout(type, options);
        layout.SetBackColor(mdui.background);

        // subscribe to the signal, to respond to mode changes
        themeSignal.subscribe(() => {
            layout.SetBackColor(mdui.background);
        });
        return layout;
    }
}

function mdui_button(text, width, height, options, layout) {
    let button_variants = ["filled", "outlined", "tonal", "elevated"];
    let button_type = null;

    // stop function execution when options arent provided

    if (!options) return;
    options
        .toLowerCase()
        .split(",")
        .forEach((el) => {
            if (button_variants.includes(el)) {
                button_type = el;
            }
        });

    let button;

    if (layout) {
        button = app.AddButton(layout, text, width, height, options);
    } else {
        button = app.CreateButton(text, width, height, options + "Custom");
    }

    function applyButtonStyle(button_type) {
        switch (button_type) {
            case "filled":
                button.Batch({
                    SetStyle: [mdui.primary, mdui.primary, 20, null, null, 0],
                    SetTextColor: [mdui.onPrimary],
                });
                break;
            case "outlined":
                button.Batch({
                    SetStyle: [
                        mdui.surface,
                        mdui.surface,
                        20,
                        mdui.outline,
                        1,
                        0,
                    ],
                    SetTextColor: [mdui.primary],
                });
                break;
            case "tonal":
                button.Batch({
                    SetStyle: [
                        mdui.primaryContainer,
                        mdui.primaryContainer,
                        20,
                        null,
                        0,
                        0,
                    ],
                    SetTextColor: [mdui.onSecondaryContainer],
                });
                break;
            case "elevated":
                button.Batch({
                    SetStyle: [
                        mdui.secondaryContainer,
                        mdui.secondaryContainer,
                        20,
                        null,
                        0,
                        0,
                    ],
                    SetTextColor: [mdui.primary],
                });
                break;
        }
    }

    // Apply the initial style
    applyButtonStyle(button_type);

    // Sync with color mode changes
    themeSignal.subscribe(() => applyButtonStyle(button_type));

    return button;
}

function mdui_snackbar(text, action_text, alignment = "Bottom") {
    this.Timeout = 3000;
    this.Animation = ["FadeIn", "FadeOut"];
    this.Show = function () {
        let main_container = app.CreateLayout(
            "Linear",
            alignment + "FillXY, ToughThrough"
        );
        let card_container = app.CreateLayout("card", "horizontal");
        main_container.AddChild(card_container);

        let container = app.CreateLayout("linear", "fillxy");
        card_container.AddChild(container);

        main_container.SetSize(0.85, 0.065);
        card_container.SetBackColor("blue");
        card_container.Animate(this.Animation[0]);
        app.AddLayout(main_container);

        setTimeout(() => {
            card_container.Animate(this.Animation[1], null, 1000);
        }, this.Timeout);
    };
}
