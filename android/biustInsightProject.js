app.LoadPlugin("material-design");
app.LoadPlugin("Support");
app.LoadPlugin("Lottie");
app.LoadPlugin("DsNav");

cfg.Fast, cfg.MUI, cfg.Light;
cfg.Node, cfg.Portrait;

app.Script("Material.Core.js");
app.Script("Material.New.js");
app.Script("Helpers.js");

function OnStart() {
    let is_new_user = app.LoadBoolean("is_new", true, "config");

    app.InitializeUIKit(MUI.colors.green.lighten1, "light");
    mdui.Initialize("light", "outlined");

    is_new_user ? loadWelcomeScreen() : loadHomeScreen();
}

function loadWelcomeScreen() {}

function loadHomeScreen() {}
