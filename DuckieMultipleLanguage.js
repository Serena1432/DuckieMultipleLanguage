//=============================================================================
// DuckieMultipleLanguage.js
//=============================================================================

/*:
 * @plugindesc v1.0 beta
 * - Add multiple languages support for RPG Maker MV games.
 * @author Serena1432
 *
 * @param Custom Language Variables
 * @type text[]
 * @desc An array containing all of the custom language variables that you want to add.
 * @default []
 *
 * @help
 * ============================================================================
 *  __  __       _ _   _ _                                              
 * |  \/  |     | | | (_) |                                             
 * | \  / |_   _| | |_ _| |     __ _ _ __   __ _ _   _  __ _  __ _  ___ 
 * | |\/| | | | | | __| | |    / _` | '_ \ / _` | | | |/ _` |/ _` |/ _ \
 * | |  | | |_| | | |_| | |___| (_| | | | | (_| | |_| | (_| | (_| |  __/
 * |_|  |_|\__,_|_|\__|_|______\__,_|_| |_|\__, |\__,_|\__,_|\__, |\___|
 *                                          __/ |             __/ |     
 *                                         |___/             |___/      
 * ============================================================================
 * Version 1.0 beta - 2022/06/14
 * Author: Serena1432 - #DuckieHVNisthebest
 * ============================================================================
 * IMPORTANT NOTICE
 * ============================================================================
 * You should ONLY use this plugin to generate language files after your game
 * has been finished. Changing the game data after generating and translating
 * can lead to a SERIOUS error!
 * Also, the "Default.json" file mentioned in this plugin is NOT automatically
 * updated each time you run the game or after changing the game data, so you
 * NEED TO do it manually by deleting this file in the "languages" folder.
 * ============================================================================
 * INTRO
 * ============================================================================
 * This plugin will add the multiple language support for games made using the
 * RPG Maker MV engine.
 * It has only been tested in RPGMV 1.6.1. Older or newer versions may not work
 * properly.
 * ============================================================================
 * INSTRUCTIONS
 * ============================================================================
 * - Copy the code to a text editor and save it as DuckieMultipleLanguage.js to
 * the "plugins" folder of your game.
 * - Turn this plugin on in the Plugin Manager and run the game for the first
 * time.
 * - A folder called "languages" will be added to your game folder containing a
 * file called "Default.json" containing almost strings that should be
 * translated.
 * - Now you just copy the JSON and save it as a new file with the name of your
 * language (i.e. "Vietnamese.json") and translate all of the strings in your
 * newly saved file.
 * Notice that you can ONLY translate strings, NOT numbers. Changing the
 * numbers in the JSON file may lead to an error.
 * ============================================================================
 * FEATURES
 * ============================================================================
 * - You can switch between languages while playing by changing the Language
 * option in the Options part.
 * - You can also create a translated picture by saving the translated picture
 * as "(original name)_(language name).png". For example, if you have an
 * original picture called "bruh.png" and the translated language is
 * Vietnamese, you should save the translated picture as "bruh_Vietnamese.png"
 * to the same folder as the original file.
 * - You can also add some custom language variables that can be used in the
 * game if the plugin doesn't collect it automatically by using the Custom
 * Language Variables in the Parameters part. Then these custom language
 * strings will be added to the Default.json file and you can begin
 * translating it.
 * You can use these custom variables anywhere by using this script command:
 *    Language.custom.(customVariableName)
 * or:
 *    Language.custom["(customVariableName)"]
 * if your custom variable name has spaces or special characters.
 * (customVariableName) is one of the defined custom variables in the
 * Parameters part.
 * - After you has done all these things, you can translate all of the strings
 * in the JSON file and all of the needed pictures directly without opening
 * the game or you can send them to the translator if you want, without sending
 * the entire project data.
 * ============================================================================
 * KNOWN BUGS/ERRORS/MISSING FEATURES
 * ============================================================================
 * - Translating strings and commands that were made by plugins are not yet
 * implemented.
 * - If your text message or scrolling text contain two or more lines, each
 * line of that message will be seperated into an object. This is RPGMV's fault
 * and I don't know how to fix it yet.
 * - Some text may not be translated/changed after changing languages in the
 * Options part. If this happens, just restart the game or return back to the
 * Title Screen.
 * ============================================================================
 * Good luck for using this plugin!
 * By the way, you can follow me on the GitHub account called "LilShieru":
 * https://www.github.com/LilShieru
 * ============================================================================
 */
 
 var _duckie_params = PluginManager.parameters('DuckieMultipleLanguage');
 var _custom_strings = _duckie_params["Custom Language Variables"] ? JSON.parse(_duckie_params["Custom Language Variables"]) : [];
 
 function DuckieUpdateLangData() {
    if (!ConfigManager["DuckieLanguage"]) ConfigManager["DuckieLanguage"] = "Default";
    _duckie_language = ConfigManager["DuckieLanguage"];
    _duckie_languages = [];
    _duckie_language_index = 0;
    _duckie_lang_folder = "./languages", _duckie_default_file = _duckie_lang_folder + "/Default.json";
    var fs = require("fs");
    if (!fs.existsSync(_duckie_lang_folder)) fs.mkdirSync(_duckie_lang_folder);
    if (!fs.existsSync(_duckie_default_file)) {
		var customStrings = {};
		for (var i = 0; i < _custom_strings.length; i++) customStrings[_custom_strings[i]] = "Insert text here";
        Language = {
            title: $dataSystem.gameTitle,
            terms: $dataSystem.terms,
			equip_types: $dataSystem.equipTypes,
			skill_types: $dataSystem.skillTypes,
			weapon_types: $dataSystem.weaponTypes,
            actors: [],
            armors: [],
            classes: [],
            common_events: [],
            enemies: [],
            items: [],
            skills: [],
            states: [],
            troops: [],
            weapons: [],
            map_data: {},
			custom: customStrings
        };
        for (var i = 1; i < $dataActors.length; i++) {
            var actor = $dataActors[i];
            Language.actors.push({
                name: actor.name,
                nickname: actor.nickname,
                profile: actor.profile
            });
        }
        for (var i = 1; i < $dataArmors.length; i++) {
            var armor = $dataArmors[i];
            Language.armors.push({
                name: armor.name,
                description: armor.description
            });
        }
        for (var i = 1; i < $dataClasses.length; i++) {
            var c = $dataClasses[i];
            Language.classes.push(c.name);
        }
        for (var i = 1; i < $dataEnemies.length; i++) {
            var c = $dataEnemies[i];
            Language.enemies.push(c.battlerName);
        }
        for (var i = 1; i < $dataItems.length; i++) {
            var item = $dataItems[i];
            Language.items.push({
                name: item.name,
                description: item.description
            });
        }
        for (var i = 1; i < $dataSkills.length; i++) {
            var skill = $dataSkills[i];
            Language.skills.push({
                name: skill.name,
                description: skill.description,
                message1: skill.message1,
                message2: skill.message2
            });
        }
        for (var i = 1; i < $dataStates.length; i++) {
            var state = $dataStates[i];
            Language.states.push({
                name: state.name,
                description: state.description,
                message1: state.message1,
                message2: state.message2,
                message3: state.message3,
                message4: state.message4
            });
        }
        for (var i = 1; i < $dataTroops.length; i++) {
            var troop = $dataTroops[i];
            if (!troop) continue;
            var troopData = {
                name: troop.name,
                pages: []
            }
            for (var j = 0; j < troop.pages.length; j++) {
                var page = troop.pages[j],
                    pageData = [];
                if (!page) continue;
                for (var k = 0; k < page.list.length; k++) {
                    var cmd = page.list[k];
                    if (!cmd) continue;
                    if (cmd.code == 401 || cmd.code == 102 || cmd.code == 405) {
                        pageData.push({
                            index: k,
                            parameters: cmd.parameters
                        });
                    }
                }
                troopData.pages.push(pageData);
            }
            Language.troops.push(troopData);
        }
        for (var i = 1; i < $dataCommonEvents.length; i++) {
            var ce = $dataCommonEvents[i];
            if (!ce) continue;
            var ceData = {
                messages: []
            }
            for (var j = 0; j < ce.list.length; j++) {
                var cmd = ce.list[j];
                if (!cmd) continue;
                if (cmd.code == 401 || cmd.code == 102 || cmd.code == 405) {
                    ceData.messages.push({
                        index: j,
                        parameters: cmd.parameters
                    });
                }
            }
            Language.common_events.push(ceData);
        }
        for (var i = 1; i < $dataWeapons.length; i++) {
            var weapon = $dataWeapons[i];
            Language.weapons.push({
                name: weapon.name,
                description: weapon.description
            });
        }
        var files = fs.readdirSync("./data");
        files.forEach(file => {
            if (!file.startsWith("Map") || isNaN(file.substr(3, 3)) || file.startsWith("MapInfos")) return;
            var json = JSON.parse(fs.readFileSync("./data/" + file));
            var messages = [];
            for (var i = 1; i < json.events.length; i++) {
                var event = json.events[i];
                if (!event) continue;
                for (var j = 0; j < event.pages.length; j++) {
                    var page = event.pages[j];
                    if (!page) continue;
                    for (var k = 0; k < page.list.length; k++) {
                        var cmd = page.list[k];
                        if (!cmd) continue;
                        if (cmd.code == 401 || cmd.code == 102 || cmd.code == 405) {
                            messages.push({
                                event: event.id,
                                page: j,
                                index: k,
                                parameters: cmd.parameters
                            });
                        }
                    }
                }
            }
            Language.map_data["MAP" + file.substr(3, 3)] = messages;
        });
        fs.writeFileSync(_duckie_default_file, JSON.stringify(Language, null, 4));
    }
    var _l = fs.readdirSync(_duckie_lang_folder),
        index = 0;
    _l.forEach(file => {
        if (!file.endsWith(".json")) return;
        if (file == _duckie_language + ".json") _duckie_language_index = index;
        _duckie_languages.push(file.substr(0, file.length - 5));
        index++;
    });
    if (fs.existsSync(_duckie_lang_folder + "/" + _duckie_language + ".json")) {
        Language = JSON.parse(fs.readFileSync(_duckie_lang_folder + "/" + _duckie_language + ".json"));
    }
    $dataSystem.gameTitle = Language.title;
    $dataSystem.terms = Language.terms;
    $dataSystem.weaponTypes = Language.weapon_types;
    $dataSystem.equipTypes = Language.equip_types;
    $dataSystem.skillTypes = Language.skill_types;
	for (var i = 0; i < Language.actors.length; i++) {
		$dataActors[i + 1].name = Language.actors[i].name;
		$dataActors[i + 1].nickname = Language.actors[i].nickname;
		$dataActors[i + 1].profile = Language.actors[i].profile;
	}
	for (var i = 0; i < Language.armors.length; i++) {
		$dataArmors[i + 1].name = Language.armors[i].name;
		$dataArmors[i + 1].description = Language.armors[i].description;
	}
	for (var i = 0; i < Language.classes.length; i++) {
		$dataClasses[i + 1].name = Language.classes[i];
	}
	for (var i = 0; i < Language.common_events.length; i++) {
		var messages = Language.common_events[i].messages;
		for (var j = 0; j < messages.length; j++)
			$dataCommonEvents[i + 1].list[messages[j].index].parameters = messages[j].parameters;
	}
	for (var i = 0; i < Language.enemies.length; i++) {
		$dataEnemies[i + 1].name = Language.enemies[i];
	}
	for (var i = 0; i < Language.items.length; i++) {
		$dataItems[i + 1].name = Language.items[i].name;
		$dataItems[i + 1].description = Language.items[i].description;
	}
	for (var i = 0; i < Language.skills.length; i++) {
		$dataSkills[i + 1].name = Language.skills[i].name;
		$dataSkills[i + 1].description = Language.skills[i].description;
		$dataSkills[i + 1].message1 = Language.skills[i].message1;
		$dataSkills[i + 1].message2 = Language.skills[i].message2;
	}
	for (var i = 0; i < Language.states.length; i++) {
		$dataStates[i + 1].name = Language.states[i].name;
		$dataStates[i + 1].description = Language.states[i].description;
		$dataStates[i + 1].message1 = Language.states[i].message1;
		$dataStates[i + 1].message2 = Language.states[i].message2;
		$dataStates[i + 1].message3 = Language.states[i].message3;
		$dataStates[i + 1].message4 = Language.states[i].message4;
		$dataStates[i + 1].message5 = Language.states[i].message5;
	}
	for (var i = 0; i < Language.troops.length; i++) {
		var troop = Language.troops[i];
		for (var j = 0; j < troop.pages.length; j++) {
			var page = troop.pages[j];
			for (var k = 0; k < page.length; k++)
				$dataTroops[i + 1].pages[j].list[page[k].index].parameters = page[k].parameters;
		}
	}
	for (var i = 0; i < Language.weapons.length; i++) {
		$dataWeapons[i + 1].name = Language.weapons[i].name;
		$dataWeapons[i + 1].description = Language.weapons[i].description;
	}
}

(function() {
	if (!Utils.isNwjs()) {
		alert("DuckieMultipleLanguage only works on desktop versions of this game. Please run the desktop version instead of the web version.");
		window.close();
	}
	Scene_Boot.prototype.start = function() {
		Scene_Base.prototype.start.call(this);
		SoundManager.preloadImportantSounds();
		if (DataManager.isBattleTest()) {
			DataManager.setupBattleTest();
			SceneManager.goto(Scene_Battle);
		} else if (DataManager.isEventTest()) {
			DataManager.setupEventTest();
			SceneManager.goto(Scene_Map);
		} else {
			DuckieUpdateLangData();
			this.checkPlayerLocation();
			DataManager.setupNewGame();
			SceneManager.goto(Scene_Title);
			Window_TitleCommand.initCommandPosition();
		}
		this.updateDocumentTitle();
	};
	
	Window_Options.prototype.statusText = function(index) {
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			return this.volumeStatusText(value);
		}
		else if (symbol.endsWith("Language")) {
			return _duckie_languages[_duckie_language_index];
		}
		else {
			return this.booleanStatusText(value);
		}
	};
	
	var _add_general_options = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		_add_general_options.call(this);
		this.addCommand('Language', 'DuckieLanguage');
	};
	
	Window_Options.prototype.processOk = function() {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			value += this.volumeOffset();
			if (value > 100) {
				value = 0;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if (symbol.endsWith("Language")) {
			if (_duckie_language_index == _duckie_languages.length - 1) _duckie_language_index = 0;
			else _duckie_language_index++;
			this.changeValue(symbol, _duckie_languages[_duckie_language_index]);
		} else {
			this.changeValue(symbol, !value);
		}
	};
	
	Window_Options.prototype.cursorLeft = function(wrap) {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			value -= this.volumeOffset();
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if (symbol.endsWith("Language")) {
			if (_duckie_language_index == 0) _duckie_language_index = _duckie_languages.length - 1;
			else _duckie_language_index--;
			this.changeValue(symbol, _duckie_languages[_duckie_language_index]);
		} else {
			this.changeValue(symbol, false);
		}
	};
	
	Window_Options.prototype.cursorRight = function(wrap) {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			value += this.volumeOffset();
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if (symbol.endsWith("Language")) {
			if (_duckie_language_index == _duckie_languages.length - 1) _duckie_language_index = 0;
			else _duckie_language_index++;
			this.changeValue(symbol, _duckie_languages[_duckie_language_index]);
		} else {
			this.changeValue(symbol, true);
		}
	};
	
	var _title_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function() {
		_title_create.call(this);
		DuckieUpdateLangData();
		this.createCommandWindow();
	}
	
	var _menu_create = Scene_MenuBase.prototype.create;
	Scene_MenuBase.prototype.create = function() {
		_menu_create.call(this);
		DuckieUpdateLangData();
		this.createWindowLayer();
	};
	
	ConfigManager.makeData = function() {
		var config = {};
		config.alwaysDash = this.alwaysDash;
		config.commandRemember = this.commandRemember;
		config.bgmVolume = this.bgmVolume;
		config.bgsVolume = this.bgsVolume;
		config.meVolume = this.meVolume;
		config.seVolume = this.seVolume;
		config.DuckieLanguage = this.DuckieLanguage;
		return config;
	};
	
	ConfigManager.applyData = function(config) {
		this.alwaysDash = this.readFlag(config, 'alwaysDash');
		this.commandRemember = this.readFlag(config, 'commandRemember');
		this.bgmVolume = this.readVolume(config, 'bgmVolume');
		this.bgsVolume = this.readVolume(config, 'bgsVolume');
		this.meVolume = this.readVolume(config, 'meVolume');
		this.seVolume = this.readVolume(config, 'seVolume');
		this.DuckieLanguage = this.readLanguage(config, 'DuckieLanguage');
	};
	
	ConfigManager.readLanguage = function(config, name) {
		return config[name];
	};
	
	Scene_Map.prototype.onMapLoaded = function() {
		if (this._transfer) {
			$gamePlayer.performTransfer();
		}
		this.createDisplayObjects();
		if (Language.map_data["MAP" + $gameMap.mapId().padZero(3)]) {
			var data = Language.map_data["MAP" + $gameMap.mapId().padZero(3)];
			for (var i = 0; i < data.length; i++)
				$dataMap.events[data[i].event].pages[data[i].page].list[data[i].index].parameters = data[i].parameters;
		}
	};
	
	Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y,
                                             scaleX, scaleY, opacity, blendMode) {
		if (require("fs").existsSync("img/pictures/" + name + "_" + _duckie_language + ".png")) name = name + "_" + _duckie_language;
		var realPictureId = this.realPictureId(pictureId);
		var picture = new Game_Picture();
		picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
		this._pictures[realPictureId] = picture;
	};
})();
