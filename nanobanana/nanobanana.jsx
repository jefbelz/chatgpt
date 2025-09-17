#target photoshop

// ===== TRANSLATIONS =====
var TRANSLATIONS = {
    ru: {
        // Main Dialog
        dialogTitle: "NanoBanana",
        modelLabel: "Модель:",
        settingsButton: "Настройки",
        promptLabel: "Промпт:",
        referenceLabel: "Референс:",
        browseButton: "Обзор...",
        optionalLabel: "(необязательно)",
        useFgColorCheckbox: "Использовать цвет переднего плана",
        newDocCheckbox: "Вывод в новый документ",
        upscaleCheckbox: "Увеличить результат (разрешение 2x)",
        generateButton: "Генерировать",
        cancelButton: "Отмена",
        // Settings Dialog
        settingsDialogTitle: "Настройки",
        apiKeyPanel: "Ключ API",
        apiKeyLabel: "Ключ API:",
        currentKeyLabel: "Текущий: ",
        troubleshootingPanel: "Устранение неполадок",
        resetCurlButton: "Сбросить проверку Curl",
        resetCurlHelp: "Используйте 'Сбросить проверку Curl', если у вас проблемы с подключением",
        updateButton: "Обновить",
        apiKeyUpdateSuccess: "Ключ API успешно обновлен!",
        apiKeyUpdateError: "Пожалуйста, введите действительный ключ API",
        curlResetSuccess: "Проверка Curl сброшена. Плагин проверит доступность curl при следующем использовании.",
        // Progress Window
        progressWindowTitle: "Генерация AI",
        generatingWith: "Генерация с помощью ",
        preparingImage: "Подготовка изображения...",
        timeEstimate: "Обычно это занимает 10-30 секунд",
        cancellingOperation: "Отмена операции...",
        windowsCmdNote: "Примечание: окна командной строки могут кратковременно появляться.\\nЭто нормально для Windows - пожалуйста, подождите.",
        // API/Processing Alerts
        encodingImage: "Кодирование изображения...",
        encodingReference: "Обработка референсного изображения...",
        processingData: "Обработка данных...",
        preparingRequest: "Подготовка запроса к AI...",
        sendingToAI: "Отправка в модель AI...",
        startingGeneration: "Запуск AI генерации...",
        aiWorking: "AI работает... ",
        downloadingResult: "Загрузка результата...",
        placingResult: "Размещение результата в документе...",
        startingUpscale: "Запуск процесса увеличения...",
        preparingUpscale: "Подготовка к увеличению...",
        sendingToUpscaler: "Отправка на увеличение...",
        upscalingInProgress: "Идет увеличение...",
        // Error/Info Alerts
        noAPIKeyError: "Ключ API не найден. Скрипт не может продолжать работу без действительного ключа API.",
        noDocumentError: "Пожалуйста, сначала откройте изображение в Photoshop!",
        noSelectionError: "Пожалуйста, сначала сделайте выделение с помощью любого инструмента выделения!",
        noPromptError: "Пожалуйста, сначала введите промпт!",
        curlMissingTitle: "Curl не найден",
        curlMissingMessage: "Этому плагину требуется установленный curl.\\n\\nЕсли вы используете Windows 10/11 и видите это сообщение,\\nпожалуйста, обновите Windows или обратитесь в поддержку.",
        encodeImageError: "Не удалось закодировать изображение",
        noApiResponse: "Нет ответа от API",
        apiError: "Ошибка API - проверьте ваш API ключ в Настройках. Ошибка: ",
        unexpectedApiResponse: "Неожиданный ответ от API: ",
        generationFailed: "Генерация не удалась. Ошибка: ",
        timeoutError: "Время ожидания истекло - попробуйте еще раз",
        noOutputUrl: "Не удалось найти URL вывода",
        downloadError: "Не удалось загрузить результат",
        exportError: "Не удалось экспортировать выделение",
        generationError: "Не удалось сгенерировать изображение. Пожалуйста, попробуйте ещё раз и переформулируйте запрос.\\nУбедитесь, что ваш запрос понятный и детализированный — если вы используете ссылку или изображение-референс, опишите как основное изображение, так и референс, чтобы ИИ понял связь.",
        processingError: "Ошибка обработки: ",
        placementError: "Ошибка размещения: ",
        // API Key Prompt
        apiKeyWindowTitle: "Ключ API",
        apiKeyRequired: "Требуется",
        apiKeySettings: "Настройки",
        apiKeyUpdateTitle: "Обновить ключ API",
        apiKeySetupTitle: "Первоначальная настройка",
        apiKeyInstruction1: "1. Получите ваш ключ API от провайдера - https://nanobananaapi.ai/",
        apiKeyInstruction2: "2. Вставьте его ниже:",
        apiKeyInstruction3: "3. Скопируйте ваш токен API",
        apiKeyInstruction4: "4. Вставьте его ниже:",
        apiKeyInputLabel: "Ключ API:",
        apiKeyStoredLocal: "Ваш ключ API хранится локально в настройках пользователя",
        // Language Selector
        languageLabel: "Язык:",
        imageUploadFailed: "Не удалось загрузить изображение",
        referenceImageUploadFailed: "Не удалось загрузить референсное изображение",
        firstRunTitle: "Nano Banana - Первая настройка",
        welcomeToAIGenerator: "Добро пожаловать в NanoBanana AI Generator!",
        firstRunMessage: "Для удобного использования этого плагина рекомендуем создать горячую клавишу.\\nЭто позволит вам быстро запускать генерацию AI прямо из Photoshop.",
        createShortcutRecommended: "Создание горячей клавиши (рекомендуется)",
        shortcutInstruction1: "1. Перейдите в Edit → Keyboard Shortcuts (Alt+Shift+Ctrl+K)",
        shortcutInstruction2: "2. В разделе 'Shortcuts For' выберите 'Application Menus'",
        shortcutInstruction3: "3. Найдите File → Scripts → nanobanana.jsx",
        shortcutInstruction4: "4. Назначьте удобную комбинацию (например, Ctrl+Alt+G)",
        scriptLocation: "Расположение скрипта",
        fileLabel: "Файл:",
        copyFullPath: "Копировать полный путь",
        pathSavedToDesktop: "Путь к скрипту сохранён на рабочем столе как 'AI_Generator_Path.txt'",
        autoAddToMenu: "Автоматическое добавление в меню",
        tryAddToMenuCheckbox: "Попытаться добавить в меню File → Scripts",
        menuNote: "Примечание: Может не работать во всех версиях Photoshop из-за ограничений безопасности",
        additionalOptions: "Дополнительные опции",
        createDesktopShortcutCheckbox: "Создать ярлык на рабочем столе",
        setupButton: "Настроить",
        skipButton: "Пропустить",
        setupComplete: "Настройка завершена! Теперь вы можете создать горячую клавишу через Edit → Keyboard Shortcuts",
        scriptRegistered: "Скрипт зарегистрирован. Возможно потребуется перезапуск Photoshop для появления в меню.",
        autoMenuAddFailed: "Не удалось автоматически добавить в меню. Используйте ручное создание горячей клавиши.",
        shortcutCreatedBat: "Ярлык создан на рабочем столе: 'nanobanana.bat'",
        shortcutCreatedCommand: "Ярлык создан на рабочем столе: 'nanaobanana.command'",
        shortcutCreationFailed: "Не удалось создать ярлык: ",
        setupShortcutsButton: "Настроить горячие клавиши",
        shortcutSetupPanel: "Настройка ярлыков",
        setupShortcutButton: "Настроить ярлыки",
        showWelcomeScreenAgain: "Показать экран советов"
    },
    en: {
        // Main Dialog
        dialogTitle: "NanoBanana",
        modelLabel: "Model:",
        settingsButton: "Settings",
        promptLabel: "Prompt:",
        referenceLabel: "Reference:",
        browseButton: "Browse...",
        optionalLabel: "(optional)",
        useFgColorCheckbox: "Use foreground color",
        newDocCheckbox: "Output to new document",
        upscaleCheckbox: "Upscale result (2x resolution)",
        generateButton: "Generate",
        cancelButton: "Cancel",
        // Settings Dialog
        settingsDialogTitle: "Settings",
        apiKeyPanel: "API Key",
        apiKeyLabel: "API Key:",
        currentKeyLabel: "Current: ",
        troubleshootingPanel: "Troubleshooting",
        resetCurlButton: "Reset Curl Check",
        resetCurlHelp: "Use 'Reset Curl Check' if you're having connection issues",
        updateButton: "Update",
        apiKeyUpdateSuccess: "API key updated successfully!",
        apiKeyUpdateError: "Please enter a valid API key",
        curlResetSuccess: "Curl check reset. Plugin will test curl availability on next use.",
        // Progress Window
        progressWindowTitle: "NanoBanana",
        generatingWith: "Generating with ",
        preparingImage: "Preparing image...",
        timeEstimate: "This usually takes 10-30 seconds",
        cancellingOperation: "Cancelling operation...",
        windowsCmdNote: "Note: Command prompt windows may briefly appear.\\nThis is normal for Windows - please wait.",
        // API/Processing Alerts
        encodingImage: "Encoding image...",
        encodingReference: "Encoding reference image...",
        processingData: "Processing data...",
        preparingRequest: "Preparing AI request...",
        sendingToAI: "Sending to AI model...",
        startingGeneration: "Starting AI generation...",
        aiWorking: "AI is working... ",
        downloadingResult: "Downloading result...",
        placingResult: "Placing result in document...",
        startingUpscale: "Starting upscale process...",
        preparingUpscale: "Preparing for upscale...",
        sendingToUpscaler: "Sending to upscaler...",
        upscalingInProgress: "Upscaling in progress...",
        // Error/Info Alerts
        noAPIKeyError: "API key not found. The script cannot continue without a valid API key.",
        noDocumentError: "Please open an image in Photoshop first!",
        noSelectionError: "Please make a selection with any selection tool first!",
        noPromptError: "Please enter a prompt first!",
        curlMissingTitle: "Curl Not Found",
        curlMissingMessage: "This plugin requires curl to be installed.\\n\\nIf you are on Windows 10/11 and see this message,\\nplease update Windows or contact support.",
        encodeImageError: "Could not encode image",
        noApiResponse: "No response from API",
        apiError: "API Error - check your API key in Settings. Error: ",
        unexpectedApiResponse: "Unexpected API response: ",
        generationFailed: "Generation failed. Error: ",
        timeoutError: "Operation timed out - please try again",
        noOutputUrl: "Could not find output URL",
        downloadError: "Could not download result",
        exportError: "Could not export selection",
        generationError: "Image generation failed. Please try again and rephrase your prompt.\\nMake sure your request is clear and detailed — if you include a reference, describe both the main image and the reference so the AI understands the connection.",
        processingError: "Processing error: ",
        placementError: "Placement error: ",
        // API Key Prompt
        apiKeyWindowTitle: "API Key",
        apiKeyRequired: "Required",
        apiKeySettings: "Settings",
        apiKeyUpdateTitle: "Update API Key",
        apiKeySetupTitle: "First Time Setup",
        apiKeyInstruction1: "1. Get your API key from the https://nanobananaapi.ai/",
        apiKeyInstruction2: "2. Paste it below:",
        apiKeyInstruction3: "3. Copy your API token",
        apiKeyInstruction4: "4. Paste it below:",
        apiKeyInputLabel: "API Key:",
        apiKeyStoredLocal: "Your API key is stored locally in your user preferences",
        // Language Selector
        languageLabel: "Language:",
        imageUploadFailed: "Could not upload image",
        referenceImageUploadFailed: "Could not upload reference image",
        firstRunTitle: "NanoBanana - First Time Setup",
        welcomeToAIGenerator: "Welcome to NanoBanana AI Generator!",
        firstRunMessage: "For convenient use of this plugin, we recommend creating a keyboard shortcut.\\nThis will allow you to quickly launch NanoBanana directly from Photoshop.",
        createShortcutRecommended: "Create Keyboard Shortcut (Recommended)",
        shortcutInstruction1: "1. Go to Edit → Keyboard Shortcuts (Alt+Shift+Ctrl+K)",
        shortcutInstruction2: "2. Under 'Shortcuts For', select 'Application Menus'",
        shortcutInstruction3: "3. Find File → Scripts → nanobanana.jsx",
        shortcutInstruction4: "4. Assign a convenient combination (e.g., Ctrl+Alt+G)",
        scriptLocation: "Script Location",
        fileLabel: "File:",
        copyFullPath: "Copy Full Path",
        pathSavedToDesktop: "Script path saved to desktop as 'AI_Generator_Path.txt'",
        autoAddToMenu: "Automatic Menu Addition",
        tryAddToMenuCheckbox: "Attempt to add to File → Scripts menu",
        menuNote: "Note: May not work in all versions of Photoshop due to security restrictions",
        additionalOptions: "Additional Options",
        createDesktopShortcutCheckbox: "Create desktop shortcut",
        setupButton: "Set Up",
        skipButton: "Skip",
        setupComplete: "Setup complete! You can now create a keyboard shortcut via Edit → Keyboard Shortcuts",
        scriptRegistered: "Script registered. A Photoshop restart may be required for it to appear in the menu.",
        autoMenuAddFailed: "Could not automatically add to menu. Please use manual shortcut creation.",
        shortcutCreatedBat: "Shortcut created on desktop: 'nanobanana.bat'",
        shortcutCreatedCommand: "Shortcut created on desktop: 'nanobanana.command'",
        shortcutCreationFailed: "Could not create shortcut: ",
        setupShortcutsButton: "Setup Shortcuts",
        shortcutSetupPanel: "Shortcut Setup",
        setupShortcutButton: "Setup Shortcuts",
        showWelcomeScreenAgain: "Show tips Screen"
    }
};

// ===== CONFIGURATION =====
var CONFIG = {
    VERSION: "v1.0",
    API_KEY: null, // Loaded later
    CREATE_TASK_URL: "https://api.kie.ai/api/v1/jobs/createTask",
    QUERY_TASK_URL: "https://api.kie.ai/api/v1/jobs/recordInfo",
    MODEL_ID: "google/nano-banana-edit",
    MAX_POLL_ATTEMPTS: 40,
    POLL_INTERVAL: 3,
    JPEG_QUALITY: 12,
    MAX_DIMENSION: 2000,
    WINDOWS_REF_MAX_DIMENSION: 2000,
    WINDOWS_REF_JPEG_QUALITY: 12,
    WINDOWS_REF_SIZE_THRESHOLD_MB: 10,
    IS_WINDOWS: $.os.indexOf("Windows") !== -1,
    LANG: 'ru' // Default language
};
function t(key) {
    var lang = CONFIG.LANG || 'ru';
    if (TRANSLATIONS[lang] && key in TRANSLATIONS[lang]) {
        return TRANSLATIONS[lang][key];
    }
    if (TRANSLATIONS.en && key in TRANSLATIONS.en) {
        return TRANSLATIONS.en[key];
    }
    return key;
}

// ===== GLOBAL CANCEL FLAG =====
var PROCESS_CANCELLED = false;

// ===== PROGRESS WINDOW =====

function createProgressWindow(modelName) {
    PROCESS_CANCELLED = false;

    var win = new Window("palette", t("progressWindowTitle"));
    win.orientation = "column";
    win.alignChildren = "fill";
    win.preferredSize.width = 350;
    win.margins = 15;
    win.spacing = 10;

    // Model info
    var modelText = win.add("statictext", undefined, t("generatingWith") + modelName);
    modelText.graphics.font = ScriptUI.newFont(modelText.graphics.font.name, ScriptUI.FontStyle.BOLD, 12);

    // Progress text
    win.statusText = win.add("statictext", undefined, t("preparingImage"));

    // Time estimate
    var timeText = win.add("statictext", undefined, t("timeEstimate"));
    timeText.graphics.font = ScriptUI.newFont(timeText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);

    // Progress bar (visual feedback)
    var progressGroup = win.add("group");
    progressGroup.alignment = "fill";
    win.progressBar = progressGroup.add("progressbar", undefined, 0, 100);
    win.progressBar.preferredSize.width = 300;
    win.progressBar.value = 0;

    // Cancel button
    var buttonGroup = win.add("group");
    buttonGroup.alignment = "center";
    var cancelBtn = buttonGroup.add("button", undefined, t("cancelButton"));
    cancelBtn.onClick = function () {
        PROCESS_CANCELLED = true;
        win.statusText.text = t("cancellingOperation");
        cancelBtn.enabled = false;
    };

    // Windows-specific warning
    if (CONFIG.IS_WINDOWS) {
        var separator = win.add("panel");
        separator.preferredSize.height = 1;

        var warningText = win.add("statictext", undefined,
            t("windowsCmdNote"), { multiline: true });
        warningText.graphics.font = ScriptUI.newFont(warningText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 9);
        warningText.justify = "center";
    }

    // Update function with progress bar
    win.updateStatus = function (status, progress) {
        try {
            if (!PROCESS_CANCELLED) {
                win.statusText.text = status;
                if (typeof progress === 'number') {
                    win.progressBar.value = Math.min(progress, 100);
                }
                win.update();
                // Force UI refresh
                app.refresh();
            }
        } catch (e) { }
    };

    win.show();
    return win;
}// ===== CURL DETECTION WITH CACHING =====
function checkCurlAvailable() {
    var prefs = loadPreferences();
    var curlStatus = prefs.curlAvailable;
    if (curlStatus !== null) {
        return curlStatus;
    }

    try {
        var testFile = new File(Folder.temp + "/curl_test_" + new Date().getTime() + ".txt");

        var cmd;
        if (CONFIG.IS_WINDOWS) {
            cmd = 'cmd.exe /c "curl.exe --version > "' + testFile.fsName + '" 2>&1"';
        } else {
            cmd = 'curl --version > "' + testFile.fsName + '" 2>&1';
        }

        app.system(cmd);

        var isAvailable = false;
        if (testFile.exists) {
            testFile.open("r");
            var result = testFile.read();
            testFile.close();
            testFile.remove();
            isAvailable = result.indexOf("curl") > -1;
        }

        var currentPrefs = loadPreferences();
        currentPrefs.curlAvailable = true;
        savePreferences(currentPrefs);
        return isAvailable;

    } catch (e) {
        var currentPrefs = loadPreferences();
        currentPrefs.curlAvailable = false;
        savePreferences(currentPrefs)
        return false;
    }
}


function showCurlMissingDialog() {
    var dialog = new Window("dialog", t("curlMissingTitle"));
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.preferredSize.width = 450;

    var message = dialog.add("statictext", undefined,
        t("curlMissingMessage"), { multiline: true });
    message.preferredSize.height = 150;

    var okBtn = dialog.add("button", undefined, "OK");
    okBtn.onClick = function () { dialog.close(); };

    dialog.show();
}
// ===== CURL OPERATIONS =====
function executeCurl(curlArgs, outputFile) {
    var cmd;

    if (CONFIG.IS_WINDOWS) {
        cmd = 'cmd.exe /c "curl.exe ' + curlArgs + ' > "' + outputFile + '" 2>&1"';
    } else {
        cmd = 'curl ' + curlArgs + ' > "' + outputFile + '" 2>&1';
    }

    app.system(cmd);

    if (outputFile) {
        var file = new File(outputFile);
        if (file.exists) {
            file.open("r");
            var content = file.read();
            file.close();
            file.remove();
            return content;
        }
    }

    return null;
}
// ===== API FUNCTIONS =====
function uploadFileToTmpfiles(imageFile) {
    var outputFile = new File(Folder.temp + "/uguu_file_upload_" + new Date().getTime() + ".json");
    var curlArgs = '-s -i -F "files[]=@' + imageFile.fsName + '" https://uguu.se/upload';

    // Run curl and write output into temp file
    app.system('curl ' + curlArgs + ' > "' + outputFile.fsName + '"');

    if (outputFile.exists) {
        outputFile.open("r");
        var response = outputFile.read();
        outputFile.close();
        outputFile.remove();

        // Match the "url" field in JSON response
        var match = response.match(/"url"\s*:\s*"([^"]+)"/);
        if (match && match[1]) {
            // Replace escaped slashes (\/ → /)
            return match[1].replace(/\\\//g, "/");
        }
    }
    return null;
}

// Helper to convert a simple JS object to a JSON string
function objectToString(obj) {
    var items = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            var valueString;
            if (typeof value === 'string') {
                valueString = '"' + escapeJsonString(value) + '"';
            } else if (typeof value === 'object' && value !== null) { // Array
                valueString = '["' + value.join('","') + '"]';
            } else {
                valueString = value;
            }
            items.push('"' + key + '":' + valueString);
        }
    }
    return '{' + items.join(',') + '}';
}

function createApiTask(modelId, inputPayload, progressWin) {
    try {
        if (PROCESS_CANCELLED) return null;

        if (progressWin) progressWin.updateStatus(t("preparingRequest"), 25);

        // Manually construct the full payload string
        var payloadString = '{"model":"' + modelId + '", "input":' + objectToString(inputPayload) + '}';

        var payloadFile = new File(Folder.temp + "/payload_" + new Date().getTime() + ".json");
        payloadFile.encoding = "UTF-8";
        payloadFile.open("w");
        payloadFile.write(payloadString);
        payloadFile.close();

        if (PROCESS_CANCELLED) {
            payloadFile.remove();
            return null;
        }

        if (progressWin) progressWin.updateStatus(t("sendingToAI"), 30);

        var responseFile = new File(Folder.temp + "/response_" + new Date().getTime() + ".json");
        var curlArgs = '-s -X POST ' +
            '-H "Authorization: Bearer ' + CONFIG.API_KEY + '" ' +
            '-H "Content-Type: application/json" ' +
            '-d @"' + payloadFile.fsName + '" ' +
            '"' + CONFIG.CREATE_TASK_URL + '"';

        var response = executeCurl(curlArgs, responseFile.fsName);
        payloadFile.remove();

        if (!response || PROCESS_CANCELLED) {
            if (!PROCESS_CANCELLED) alert(t("noApiResponse"));
            return null;
        }

        var taskId = extractTaskId(response);
        if (taskId) {
            if (progressWin) progressWin.updateStatus(t("startingGeneration"), 35);
            return pollForResult(taskId, progressWin);
        }

        alert(t("unexpectedApiResponse") + response);
        return null;

    } catch (e) {
        if (!PROCESS_CANCELLED) alert(t("apiError") + e.message);
        return null;
    }
}

// This function now prepares the data and calls the generic task creator.
function callAPI(imageFile, referenceFile, prompt, modelVersion, isNanoBanana, progressWin) {
    // Upload main image
    var mainImageUrl = uploadFileToTmpfiles(imageFile);
    if (!mainImageUrl || PROCESS_CANCELLED) {
        if (!PROCESS_CANCELLED) alert(t("imageUploadFailed"));
        return null;
    }

    if (progressWin) progressWin.updateStatus(t("processingData"), 15);

    // Handle reference image
    var imageUrls = [mainImageUrl];
    if (referenceFile && referenceFile.exists) {
        if (PROCESS_CANCELLED) return null;
        if (progressWin) progressWin.updateStatus(t("encodingReference"), 20);
        var refImageUrl = uploadFileToTmpfiles(referenceFile);
        if (!refImageUrl) {
            alert(t("referenceImageUploadFailed"));
            return null;
        }
        imageUrls.push(refImageUrl);
    }

    // Build the descriptive prompt
    var finalPrompt = prompt;
    if (referenceFile && referenceFile.exists) {
        //var instruction = "You are given two images. " +
      //                    "The first image, named '" + imageFile.name + "', is the main image to be modified. " +
        //                  "The second image, named '" + referenceFile.name + "', is the reference. " +
          //                "Your task is to apply the style or content from the reference to the main image according to the following instructions: ";
        //finalPrompt = instruction + prompt;
        imageUrls = [refImageUrl];
        imageUrls.push(mainImageUrl);

    }

    // Prepare the specific input payload for image generation
    var inputPayload = {
        prompt: finalPrompt,
        image_urls: imageUrls,
        output_format: "png",
        image_size: "auto"
    };

    // Call the generic task creator with the correct model and payload
    return createApiTask(CONFIG.MODEL_ID, inputPayload, progressWin);
}

function extractJsonValue(jsonString, key) {
    try {
        // This single, robust regex handles multiple value types:
        // 1. Unquoted values like: null, true, false, or numbers.
        // 2. Quoted strings, including complex ones with escaped characters.
        var regex = new RegExp('"' + key + '"\\s*:\\s*(?:(null|true|false|[\\d\\.-]+)|"((?:\\\\.|[^"\\\\])*)")');
        var match = jsonString.match(regex);

        if (match) {
            // If match[1] is captured, it's an unquoted literal (null, boolean, number). Return it.
            if (match[1] !== undefined) {
                return match[1];
            }
            // If match[2] is captured, it's the content of a string. Return it raw.
            // This correctly handles both simple strings and the complex "resultJson" string.
            if (match[2] !== undefined) {
                return match[2];
            }
        }
    } catch (e) {
        // Silently fail on any error
    }
    return null;
}

function pollForResult(taskId, progressWin) {
    var startTime = new Date().getTime();
    var maxAttempts = CONFIG.MAX_POLL_ATTEMPTS;
    var attempt = 0;

    function checkStatus() {
        if (PROCESS_CANCELLED) return null;

        attempt++;
        var percent = Math.min(Math.round((attempt / maxAttempts) * 100), 95);
        var elapsed = Math.round((new Date().getTime() - startTime) / 1000);

        if (progressWin) {
            progressWin.updateStatus(t("aiWorking") + percent + "% (" + elapsed + "s)", percent);
        }

        var statusFile = new File(Folder.temp + "/status_" + new Date().getTime() + ".json");
        var curlArgs = '-s -H "Authorization: Bearer ' + CONFIG.API_KEY + '" ' +
            '"' + CONFIG.QUERY_TASK_URL + '?taskId=' + taskId + '"';

        var response = executeCurl(curlArgs, statusFile.fsName);

        if (response && !PROCESS_CANCELLED) {

            var state = extractJsonValue(response, 'state');
            
            if (state === 'success') {
                if (progressWin) progressWin.updateStatus(t("downloadingResult"), 100);
                return downloadResult(response);
            }

            var failCode = extractJsonValue(response, 'failCode');
            if (failCode && failCode !== 'null') {
                var failMsg = extractJsonValue(response, 'failMsg') || "Unknown error";
                 if (progressWin) {
                    try { progressWin.close(); } catch(e) {}
                }
                alert(t("generationFailed") + failMsg);
                return null;
            }
         }

        // Continue polling if not finished and not cancelled
        if (attempt < maxAttempts && !PROCESS_CANCELLED) {
            var sleepChunks = CONFIG.POLL_INTERVAL * 4;
            for (var i = 0; i < sleepChunks && !PROCESS_CANCELLED; i++) {
                $.sleep(250);
                if (progressWin) {
                    try {
                        progressWin.update();
                        app.refresh();
                    } catch (e) { }
                }
            }

            if (!PROCESS_CANCELLED) {
                return checkStatus(); // Recursive call
            }
        }

        if (!PROCESS_CANCELLED && attempt >= maxAttempts) {
            alert(t("timeoutError"));
        }
        
        if (progressWin) {
            try { progressWin.close(); } catch(e) {}
        }
        return null;
    }

    return checkStatus();
}


function downloadResult(response) {
    var outputUrl = extractOutputUrl(response);

    if (!outputUrl) {
        alert(t("noOutputUrl")); // "Could not find output URL"
        return null;
    }

    var resultFile = new File(Folder.temp + "/ai_result_" + new Date().getTime() + ".jpg");
    var downloadFile = new File(Folder.temp + "/download_" + new Date().getTime() + ".jpg");


    var curlArgs = '-s -L -o "' + downloadFile.fsName + '" "' + outputUrl + '"';
    executeCurl(curlArgs, resultFile.fsName);

    // Check if download file exists (curl -o creates the file directly)
    if (downloadFile.exists && downloadFile.length > 0) {
        return downloadFile;
    }

    alert(t("downloadError")); // "Could not download result"
    return null;
}

// ===== PROCESSING FUNCTIONS =====
function processSelection(prompt, modelName, newDocument, upscale, referenceFile) {
    try {
        var doc = app.activeDocument;
        var modelVersion = null; // No longer needed
        var isNanoBanana = true; // Always true now

        // Save current selection
        var savedSelection = doc.channels.add();
        savedSelection.name = "AI Selection";
        doc.selection.store(savedSelection);

        // Get selection bounds
        var bounds = doc.selection.bounds;
        var x1 = Math.round(bounds[0].value);
        var y1 = Math.round(bounds[1].value);
        var x2 = Math.round(bounds[2].value);
        var y2 = Math.round(bounds[3].value);

        // Export selection
        var tempFile = exportSelection(doc, x1, y1, x2, y2);

        if (!tempFile || !tempFile.exists) {
            alert(t("exportError"));
            savedSelection.remove();
            return;
        }

        // Show progress window
        var progressWin = createProgressWindow(modelName);

        // Call API
        var resultFile = callAPI(tempFile, referenceFile, prompt, modelVersion, isNanoBanana, progressWin);

        // Cleanup
        tempFile.remove();

        if (PROCESS_CANCELLED) {
            progressWin.close();
            savedSelection.remove();
            return;
        }

        if (resultFile && resultFile.exists) {
             if (upscale && !PROCESS_CANCELLED) {
                resultFile = upscaleImage(resultFile, progressWin);
            }
            if (!PROCESS_CANCELLED) {
                progressWin.updateStatus(t("placingResult")); // "Placing result in document..."

                if (newDocument) {
                    app.open(resultFile);
                } else {
                    placeResultInDocument(doc, resultFile, x1, y1, x2, y2, savedSelection, prompt);
                }
            }

            resultFile.remove();
            progressWin.close();
        } else {
            progressWin.close();
            if (!PROCESS_CANCELLED) {
                // Error is already shown in pollForResult
            }
            savedSelection.remove();
        }

    } catch (e) {
        alert(t("processingError") + e.message); // "Processing error: "
    }
}

function upscaleImage(imageFile, progressWin) {
    try {
        // FIX: Use the correct translation function 't()' instead of '__()'
        if (progressWin) progressWin.updateStatus(t("preparingUpscale"));

        // Use the correct upload function for the new API
        var imageUrl = uploadFileToTmpfiles(imageFile);
        if (!imageUrl || PROCESS_CANCELLED) {
            // If upload fails, it's safer to return the original, un-upscaled image
            return imageFile;
        }

        // Define the specific input payload for the upscale model
        var upscaleInputPayload = {
            image: imageUrl,
            scale: 2,
            face_enhance: false
        };

        // Define the upscale model ID
        var upscaleModelId = "nano-banana-upscale";

        // FIX: Use the correct translation function 't()'
        if (progressWin) progressWin.updateStatus(t("sendingToUpscaler"));

        // Call the generic task creator with the upscale model and payload
        var upscaledFile = createApiTask(upscaleModelId, upscaleInputPayload, progressWin);

        if (upscaledFile && upscaledFile.exists) {
            // If upscaling was successful, remove the old (smaller) file
            imageFile.remove();
            return upscaledFile;
        }

        // If upscaling failed for any reason, return the original image
        return imageFile;

    } catch (e) {
        // On error, always return the original image to avoid losing the user's work
        return imageFile;
    }
}

function exportSelection(doc, x1, y1, x2, y2) {
    try {
        doc.selection.deselect();
        doc.artLayers.add();
        var tempLayer = doc.activeLayer;
        tempLayer.name = "Temp Merged";

        selectAll();
        copyMerged();
        doc.paste();

        var cropDoc = doc.duplicate("temp_crop", true);
        cropDoc.crop([x1, y1, x2, y2]);

        // Resize if too large
        var width = cropDoc.width.value;
        var height = cropDoc.height.value;
        var maxDim = CONFIG.MAX_DIMENSION;

        if (width > maxDim || height > maxDim) {
            var scale = maxDim / Math.max(width, height);
            var newWidth = Math.round(width * scale);
            var newHeight = Math.round(height * scale);
            cropDoc.resizeImage(UnitValue(newWidth, "px"), UnitValue(newHeight, "px"), null, ResampleMethod.BICUBIC);
        }

        var timestamp = new Date().getTime();
        var tempFile = new File(Folder.temp + "/ai_input_" + timestamp + ".jpg");

        var saveOptions = new JPEGSaveOptions();
        saveOptions.quality = CONFIG.JPEG_QUALITY;
        cropDoc.saveAs(tempFile, saveOptions, true, Extension.LOWERCASE);

        cropDoc.close(SaveOptions.DONOTSAVECHANGES);

        doc.activeLayer = tempLayer;
        tempLayer.remove();

        return tempFile;

    } catch (e) {
        alert(t("exportError") + e.message);
        return null;
    }
}

// ===== API KEY MANAGEMENT =====

function getAPIKey() {
    var prefs = loadPreferences();
    var apiKey = prefs.apiKey;

    if (!apiKey || apiKey.length < 10) {
        promptForAPIKey();
    }
    var currentPrefs = loadPreferences();
    apiKey = prefs.apiKey;
    return apiKey;
}


function getPreferencesFile() {
    var prefsFolder = new Folder(Folder.userData + "/NanoBanana");
    if (!prefsFolder.exists) {
        prefsFolder.create();
    }
    return new File(prefsFolder + "/preferences.json");
}

/**
 * Loads all preferences from the file into a single object using regex.
 */
function loadPreferences() {
    var prefs = {};
    try {
        var prefsFile = getPreferencesFile();
        if (prefsFile.exists) {
            prefsFile.open("r");
            var content = prefsFile.read();
            prefsFile.close();

            // Use regex to extract each known value from the file content
            var apiKeyMatch = content.match(/"apiKey"\s*:\s*"([^"]*)"/);
            if (apiKeyMatch) prefs.apiKey = apiKeyMatch[1];

            var modelMatch = content.match(/"lastModel"\s*:\s*"([^"]*)"/);
            if (modelMatch) prefs.lastModel = modelMatch[1];

            var langMatch = content.match(/"language"\s*:\s*"([^"]*)"/);
            if (langMatch) prefs.language = langMatch[1];

            var curlMatch = content.match(/"curlAvailable"\s*:\s*(true|false)/);
            if (curlMatch) prefs.curlAvailable = (curlMatch[1] === "true");

            var firstRunMatch = content.match(/"firstRunComplete"\s*:\s*(true|false)/);
            if (firstRunMatch) prefs.firstRunComplete = (firstRunMatch[1] === "true");
        }
    } catch (e) {
        // Silently fail, will return an empty object.
    }
    return prefs;
}

/**
 * Saves a preferences object to the file by manually building a JSON-like string.
 * @param {Object} prefs The object containing all preferences to save.
 */
function savePreferences(prefs) {
    try {
        var prefsFile = getPreferencesFile();
        prefsFile.open("w");

        var pairs = [];
        // Define the order of keys for a consistently formatted file
        var keys = ["apiKey", "lastModel", "language", "curlAvailable", "firstRunComplete"];

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // Only add the key if it exists in the object and is not null/undefined
            if (prefs.hasOwnProperty(key) && prefs[key] !== null && prefs[key] !== undefined) {
                var value = prefs[key];
                var valueString;

                if (typeof value === 'string') {
                    // Manually escape backslashes and quotes to create a valid JSON string value
                    var escapedValue = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                    valueString = '"' + escapedValue + '"';
                } else {
                    // For boolean or number, just convert to its string representation
                    valueString = String(value);
                }
                pairs.push('"' + key + '": ' + valueString);
            }
        }

        // Create a nicely formatted JSON string by hand
        var jsonString = '{\n  ' + pairs.join(',\n  ') + '\n}';
        prefsFile.write(jsonString);
        prefsFile.close();
    } catch (e) {
        // Silently fail on error
    }
}


function promptForAPIKey(fromSettings) {
    var dialog = new Window("dialog", t("apiKeyWindowTitle") + " " + (fromSettings ? t("apiKeySettings") : t("apiKeyRequired")));
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.preferredSize.width = 450;
    dialog.margins = 15;
    dialog.spacing = 10;

    var instructionPanel = dialog.add("panel", undefined, fromSettings ? t("apiKeyUpdateTitle") : t("apiKeySetupTitle"));
    instructionPanel.alignChildren = "left";
    instructionPanel.margins = 10;

    instructionPanel.add("statictext", undefined, t("apiKeyInstruction1"));
    instructionPanel.add("statictext", undefined, t("apiKeyInstruction2"));

    var apiKeyGroup = dialog.add("group");
    apiKeyGroup.add("statictext", undefined, t("apiKeyInputLabel"));
    var apiKeyInput = apiKeyGroup.add("edittext", undefined, "");
    apiKeyInput.characters = 40;

    if (fromSettings && CONFIG.API_KEY) {
        apiKeyInput.text = CONFIG.API_KEY;
        apiKeyInput.active = true;

        var maskedKey = CONFIG.API_KEY.substr(0, 8) + "..." + CONFIG.API_KEY.substr(-4);
        var currentKeyText = dialog.add("statictext", undefined, t("currentKeyLabel") + maskedKey);
        currentKeyText.graphics.font = ScriptUI.newFont(currentKeyText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);
    } else {
        apiKeyInput.active = true;
    }

    var privacyText = dialog.add("statictext", undefined, t("apiKeyStoredLocal"));
    privacyText.graphics.font = ScriptUI.newFont(privacyText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "center";
    var okButton = buttonGroup.add("button", undefined, fromSettings ? t("updateButton") : "OK");
    var cancelButton = buttonGroup.add("button", undefined, t("cancelButton"));

    okButton.onClick = function () {
        if (apiKeyInput.text.length < 10) {
            if (fromSettings) {
                dialog.close(0);
            } else {
                alert(t("apiKeyUpdateError"));
            }
        } else {
            var currentPrefs = loadPreferences();
            currentPrefs.apiKey = apiKeyInput.text;
            savePreferences(currentPrefs);
            dialog.close(1);
        }
    };

    cancelButton.onClick = function () {
        dialog.close(0);
    };

    var result = dialog.show();
    return null;
}

// ===== MAIN DIALOG =====

function createDialog() {
    var dialog = new Window("dialog", t("dialogTitle") + " " + CONFIG.VERSION);
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.preferredSize.width = 400;
    dialog.margins = 15;
    dialog.spacing = 10;
    var prefs = loadPreferences();
    CONFIG.LANG = prefs.language || 'ru'
    // Language selector
    var langGroup = dialog.add("group");
    langGroup.alignment = "right";
    langGroup.add("statictext", undefined, t("languageLabel"));
    var langDropdown = langGroup.add("dropdownlist", undefined, ["Русский", "English"]);
    langDropdown.selection = CONFIG.LANG === 'ru' ? 0 : 1;
    langDropdown.onChange = function () {
     CONFIG.LANG = langDropdown.selection.index === 0 ? 'ru' : 'en';
     var currentPrefs = loadPreferences();
     currentPrefs.language = CONFIG.LANG;
     savePreferences(currentPrefs);
        dialog.close(2); // Special code to trigger UI refresh
    };

    // Model selector and Settings in top row
    var topRow = dialog.add("group");
    topRow.alignment = "fill";

    var modelGroup = topRow.add("group");
    modelGroup.alignment = "left";
    modelGroup.add("statictext", undefined, t("modelLabel"));
    dialog.modelDropdown = modelGroup.add("dropdownlist", undefined, ["Nano-Banana"]);
     var prefs = loadPreferences();
    var lastModel = prefs.lastModel;
    var defaultModel = 0;
    if (lastModel) {
        for (var i = 0; i < dialog.modelDropdown.items.length; i++) {
            if (dialog.modelDropdown.items[i].text == lastModel) {
                defaultModel = i;
                break;
            }
        }
    }
    dialog.modelDropdown.selection = defaultModel;
    dialog.modelDropdown.onChange = function () {
        var currentPrefs = loadPreferences();
        currentPrefs.lastModel = this.selection.text;
        savePreferences(currentPrefs);
    };
    var settingsGroup = topRow.add("group");
    settingsGroup.alignment = "right";
    var settingsBtn = settingsGroup.add("button", undefined, t("settingsButton"));
    settingsBtn.preferredSize.width = 80;

    settingsBtn.onClick = function () {
        var settingsDialog = new Window("dialog", t("settingsDialogTitle"));
        settingsDialog.orientation = "column";
        settingsDialog.alignChildren = "fill";
        settingsDialog.preferredSize.width = 450;
        settingsDialog.margins = 15;
        settingsDialog.spacing = 10;

        // API Key section
        var apiSection = settingsDialog.add("panel", undefined, t("apiKeyPanel"));
        apiSection.alignChildren = "fill";
        apiSection.margins = 10;

        var apiKeyGroup = apiSection.add("group");
        apiKeyGroup.add("statictext", undefined, t("apiKeyLabel"));
        var apiKeyInput = apiKeyGroup.add("edittext", undefined, "");
        apiKeyInput.characters = 35;

        if (CONFIG.API_KEY) {
            apiKeyInput.text = CONFIG.API_KEY;
            var maskedKey = CONFIG.API_KEY.substr(0, 8) + "..." + CONFIG.API_KEY.substr(-4);
            var currentKeyText = apiSection.add("statictext", undefined, t("currentKeyLabel") + " " + maskedKey);
            currentKeyText.graphics.font = ScriptUI.newFont(currentKeyText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);
        }

        // Troubleshooting section
        var troubleSection = settingsDialog.add("panel", undefined, t("troubleshootingPanel"));
        troubleSection.alignChildren = "fill";
        troubleSection.margins = 10;

        var resetCurlBtn = troubleSection.add("button", undefined, t("resetCurlButton"));
        resetCurlBtn.alignment = "left";

        resetCurlBtn.onClick = function () {
            var prefs = loadPreferences();
            var prefsFile = getPreferencesFile();
            prefsFile.open("w");
            var json = '{';
            if (prefs.apiKey) {
                json += '"apiKey":"' + prefs.apiKey + '"';
            }
            if (prefs.lastModel) {
                if (prefs.apiKey) json += ',';
                json += '"lastModel":"' + prefs.lastModel + '"';
            }
            json += '}';
            prefsFile.write(json);
            prefsFile.close();

            alert(t("curlResetSuccess"));
        };

        var helpText = troubleSection.add("statictext", undefined, t("resetCurlHelp"));
        helpText.graphics.font = ScriptUI.newFont(helpText.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);

        // Shortcuts Setup
        var shortcutSection = settingsDialog.add("panel", undefined, t("shortcutSetupPanel"));
        shortcutSection.alignChildren = "fill";
        shortcutSection.margins = 10;

        var setupShortcutBtn = shortcutSection.add("button", undefined, t("setupShortcutButton"));
        setupShortcutBtn.alignment = "left";
        setupShortcutBtn.onClick = function () {
            showFirstRunDialog();
        };
        var shortcutSection = settingsDialog.add("panel", undefined, t("shortcutSetupPanel"));
        shortcutSection.alignChildren = "fill";
        shortcutSection.margins = 10;

        var setupShortcutBtn = shortcutSection.add("button", undefined, t("setupShortcutButton"));
        setupShortcutBtn.alignment = "left";

        setupShortcutBtn.onClick = function () {
            showFirstRunDialog();
        };
        var showWelcomeBtn = shortcutSection.add("button", undefined, t("showWelcomeScreenAgain"));
        showWelcomeBtn.alignment = "left";
        showWelcomeBtn.helpTip = "Display the initial setup screen with shortcut instructions."; // Tooltip for clarity

        showWelcomeBtn.onClick = function() {
            // Simply call the function that shows the first run dialog
            showFirstRunDialog();
        };

        // Buttons
        var buttonGroup = settingsDialog.add("group");
        buttonGroup.alignment = "center";
        var updateBtn = buttonGroup.add("button", undefined, t("updateButton"));
        var cancelBtn = buttonGroup.add("button", undefined, t("cancelButton"));

        updateBtn.onClick = function () {
            if (apiKeyInput.text.length > 10) {
                CONFIG.API_KEY = apiKeyInput.text;
                var currentPrefs = loadPreferences();
                currentPrefs.apiKey = apiKeyInput.text;
                savePreferences(currentPrefs);
                alert(t("apiKeyUpdateSuccess"));
                settingsDialog.close();
            } else {
                alert(t("apiKeyUpdateError"));
            }
        };

        cancelBtn.onClick = function () {
            settingsDialog.close();
        };

        settingsDialog.show();
    };

    // Prompt input
    var promptGroup = dialog.add("panel", undefined, t("promptLabel"));
    promptGroup.alignChildren = "fill";
    promptGroup.margins = 10;
    dialog.promptInput = promptGroup.add("edittext", undefined, "");
    dialog.promptInput.characters = 50;
    dialog.promptInput.active = true;

    dialog.promptInput.addEventListener('keydown', function (e) {
        if (e.keyName == 'Enter') {
            e.preventDefault();
            dialog.close(1);
        }
    });

    // Reference image selector (Nano-Banana only)
    var referenceGroup = dialog.add("group");
    referenceGroup.alignment = "fill";
    referenceGroup.add("statictext", undefined, t("referenceLabel"));
    var refButton = referenceGroup.add("button", undefined, t("browseButton"));
    refButton.preferredSize.width = 80;
    var refText = referenceGroup.add("statictext", undefined, t("optionalLabel"));
    refText.characters = 25;
    dialog.referenceFile = null;

    refButton.onClick = function () {
        var file = File.openDialog(t("referenceLabel"), "*.jpg;*.jpeg;*.png");
        if (file) {
            refText.text = file.name;
            dialog.referenceFile = file;
        }
    };

    // Foreground color checkbox (Nano-Banana only)
    dialog.colorCheckbox = dialog.add("checkbox", undefined, t("useFgColorCheckbox"));
    dialog.colorCheckbox.value = false;

    // Output options
    dialog.newDocCheckbox = dialog.add("checkbox", undefined, t("newDocCheckbox"));
    dialog.newDocCheckbox.value = false;

    dialog.upscaleCheckbox = dialog.add("checkbox", undefined, t("upscaleCheckbox"));
    dialog.upscaleCheckbox.value = false;
    dialog.upscaleCheckbox.visible = true;

    // Buttons
    var buttonGroup2 = dialog.add("group");
    buttonGroup2.alignment = "center";
    var generateButton = buttonGroup2.add("button", undefined, t("generateButton"));
    var cancelButton2 = buttonGroup2.add("button", undefined, t("cancelButton"));

    generateButton.onClick = function () { dialog.close(1); };
    cancelButton2.onClick = function () { dialog.close(0); };

    // Model dropdown change handler
    dialog.modelDropdown.onChange = function () {
        var isNanoBanana = this.selection.text.indexOf("Nano") > -1;

        if (referenceGroup) {
            referenceGroup.visible = isNanoBanana;

            if (!isNanoBanana) {
                dialog.referenceFile = null;
                if (refText) refText.text = t("optionalLabel");
            }
        }

        dialog.colorCheckbox.visible = isNanoBanana;

        if (!isNanoBanana) {
            dialog.colorCheckbox.value = false;
        }
        var currentPrefs = loadPreferences();
        currentPrefs.lastModel = this.selection.text;
        savePreferences(currentPrefs);

    };

    // Initialize visibility
    var isNanoBananaDefault = dialog.modelDropdown.selection.text.indexOf("Nano") > -1;
    if (referenceGroup) {
        referenceGroup.visible = isNanoBananaDefault;
    }
    dialog.colorCheckbox.visible = isNanoBananaDefault;

    return dialog;
}

// ===== HELPER FUNCTIONS =====
function extractTaskId(response) {
    try {

        var match = response.match(/"taskId"\s*:\s*"([^"]+)"/);
        if (match && match[1]) {
            return match[1];
        }
    } catch (e) { }
    return null;
}


function extractOutputUrl(response) {
    try {

        var match = response.match(/"resultJson"\s*:\s*".*?\\"resultUrls\\"\s*:\s*\[\\"(https?:\/\/[^"\\]+)/);

        if (match && match[1]) {
            // match[1] will be the clean URL, e.g., "https://..."

            return match[1];
        }
    } catch (e) {
        // Silently fail on any regex error
    }
    // If we couldn't find the URL for any reason, return null.
    return null;
}

function escapeJsonString(str) {
    return str.replace(/\\/g, '\\\\')
         .replace(/"/g, '\\"')
         .replace(/\n/g, '\\n')
         .replace(/\r/g, '\\r')
         .replace(/\t/g, '\\t');
}


function hasActiveSelection() {
    try {
        var bounds = app.activeDocument.selection.bounds;
        return true;
    } catch (e) {
        return false;
    }
}

function placeResultInDocument(doc, resultFile, x1, y1, x2, y2, savedSelection, prompt) {
    try {
        var resultDoc = app.open(resultFile);

        resultDoc.artLayers[0].duplicate(doc, ElementPlacement.PLACEATBEGINNING);
        resultDoc.close(SaveOptions.DONOTSAVECHANGES);

        var newLayer = doc.artLayers[0];
        newLayer.name = prompt.substring(0, 30);

        var targetWidth = x2 - x1;
        var targetHeight = y2 - y1;

        var currentBounds = newLayer.bounds;
        var currentWidth = currentBounds[2].value - currentBounds[0].value;
        var currentHeight = currentBounds[3].value - currentBounds[1].value;

        if (Math.abs(currentWidth - targetWidth) > 1 || Math.abs(currentHeight - targetHeight) > 1) {
            var scaleX = (targetWidth / currentWidth) * 100;
            var scaleY = (targetHeight / currentHeight) * 100;
            var uniformScale = Math.min(scaleX, scaleY);

            newLayer.resize(uniformScale, uniformScale, AnchorPosition.TOPLEFT);
        }

        var finalBounds = newLayer.bounds;
        var finalWidth = finalBounds[2].value - finalBounds[0].value;
        var finalHeight = finalBounds[3].value - finalBounds[1].value;

        var centerX = x1 + (targetWidth / 2);
        var centerY = y1 + (targetHeight / 2);

        var currentCenterX = finalBounds[0].value + (finalWidth / 2);
        var currentCenterY = finalBounds[1].value + (finalHeight / 2);

        var dx = centerX - currentCenterX;
        var dy = centerY - currentCenterY;

        newLayer.translate(dx, dy);

        doc.selection.load(savedSelection);
        addLayerMask();
        doc.selection.deselect();

        savedSelection.remove();

    } catch (e) {
        alert(t("placementError") + e.message); // "Placement error: "
    }
}

function selectAll() {
    app.activeDocument.selection.selectAll();
}

function copyMerged() {
    var idCpyM = charIDToTypeID("CpyM");
    executeAction(idCpyM, undefined, DialogModes.NO);
}

function addLayerMask() {
    try {
        var idMk = charIDToTypeID("Mk  ");
        var desc = new ActionDescriptor();
        var idNw = charIDToTypeID("Nw  ");
        var idChnl = charIDToTypeID("Chnl");
        desc.putClass(idNw, idChnl);
        var idAt = charIDToTypeID("At  ");
        var ref = new ActionReference();
        var idChnl2 = charIDToTypeID("Chnl");
        var idChnl3 = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref.putEnumerated(idChnl2, idChnl3, idMsk);
        desc.putReference(idAt, ref);
        var idUsng = charIDToTypeID("Usng");
        var idUsrM = charIDToTypeID("UsrM");
        var idRvlS = charIDToTypeID("RvlS");
        desc.putEnumerated(idUsng, idUsrM, idRvlS);
        executeAction(idMk, desc, DialogModes.NO);
    } catch (e) { }
}

// ===== SHORTCUT AND MENU INSTALLATION =====
function showFirstRunDialog() {
    var dialog = new Window("dialog", t("firstRunTitle"));
    dialog.orientation = "column";
    dialog.alignChildren = "fill";
    dialog.preferredSize.width = 500;
    dialog.margins = 15;
    dialog.spacing = 15;
    var langGroup = dialog.add("group");
    langGroup.alignment = "right";
    langGroup.add("statictext", undefined, t("languageLabel"));
    var langDropdown = langGroup.add("dropdownlist", undefined, ["Русский", "English"]);
    langDropdown.selection = CONFIG.LANG === 'ru' ? 0 : 1;
    langDropdown.onChange = function () {
        CONFIG.LANG = langDropdown.selection.index === 0 ? 'ru' : 'en';
         var currentPrefs = loadPreferences();
        currentPrefs.language = CONFIG.LANG;
        savePreferences(currentPrefs);
        dialog.close(2); // Use code 2 to signal a language change
    };
    // Welcome message
    var welcomePanel = dialog.add("panel", undefined, t("welcomeToAIGenerator"));
    welcomePanel.alignChildren = "fill";
    welcomePanel.margins = 10;

    var welcomeText = welcomePanel.add("statictext", undefined,
        t("firstRunMessage"),
        { multiline: true });

    // Keyboard shortcut instructions
    var shortcutPanel = dialog.add("panel", undefined, t("createShortcutRecommended"));
    shortcutPanel.alignChildren = "fill";
    shortcutPanel.margins = 10;

    var instructionGroup = shortcutPanel.add("group");
    instructionGroup.orientation = "column";
    instructionGroup.alignChildren = "left";

    instructionGroup.add("statictext", undefined, t("shortcutInstruction1"));
    instructionGroup.add("statictext", undefined, t("shortcutInstruction2"));
    instructionGroup.add("statictext", undefined, t("shortcutInstruction3"));
    instructionGroup.add("statictext", undefined, t("shortcutInstruction4"));

    // Script location info
    var locationPanel = dialog.add("panel", undefined, t("scriptLocation"));
    locationPanel.alignChildren = "fill";
    locationPanel.margins = 10;

    var scriptPath = $.fileName;
    var shortPath = "..." + scriptPath.substring(scriptPath.length - 50);

    var pathGroup = locationPanel.add("group");
    pathGroup.add("statictext", undefined, t("fileLabel"));
    var pathText = pathGroup.add("statictext", undefined, shortPath);
    pathText.characters = 40;

    var copyPathBtn = locationPanel.add("button", undefined, t("copyFullPath"));
    copyPathBtn.alignment = "left";

    copyPathBtn.onClick = function () {
        // Create a temporary file with the path for user to copy
        var tempFile = new File(Folder.desktop + "/AI_Generator_Path.txt");
        tempFile.open("w");
        tempFile.write("Путь к скрипту NanoBanana:\\n\\n" + scriptPath +
            "\\n\\nДля создания горячей клавиши:\\n" +
            "1. Edit → Keyboard Shortcuts\\n" +
            "2. Application Menus → File → Scripts → Browse...\\n" +
            "3. Выберите этот файл\\n" +
            "4. Назначьте горячую клавишу");
        tempFile.close();

        alert(t("pathSavedToDesktop"));
    };

    // Try to add to menu (may not work in all versions)
    var menuPanel = dialog.add("panel", undefined, t("autoAddToMenu"));
    menuPanel.alignChildren = "fill";
    menuPanel.margins = 10;

    var menuCheckbox = menuPanel.add("checkbox", undefined, t("tryAddToMenuCheckbox"));
    menuCheckbox.value = false;

    var menuNote = menuPanel.add("statictext", undefined,
        t("menuNote"),
        { multiline: true });
    menuNote.graphics.font = ScriptUI.newFont(menuNote.graphics.font.name, ScriptUI.FontStyle.ITALIC, 10);

    // Options
    var optionPanel = dialog.add("panel", undefined, t("additionalOptions"));
    optionPanel.alignChildren = "fill";
    optionPanel.margins = 10;

    var desktopShortcut = optionPanel.add("checkbox", undefined, t("createDesktopShortcutCheckbox"));
    desktopShortcut.value = false;

    // Buttons
    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "center";
    var setupBtn = buttonGroup.add("button", undefined, t("setupButton"));
    var skipBtn = buttonGroup.add("button", undefined, t("skipButton"));

    setupBtn.onClick = function () {
        if (menuCheckbox.value) {
            tryAddToMenu();
        }

        if (desktopShortcut.value) {
            createDesktopShortcut();
        }

        var currentPrefs = loadPreferences();
        currentPrefs.firstRunComplete = true;
        savePreferences(currentPrefs);
        alert(t("setupComplete"));
        dialog.close(1);
    };



    skipBtn.onClick = function () {
        var currentPrefs = loadPreferences();
        currentPrefs.firstRunComplete = true;
        savePreferences(currentPrefs);
        dialog.close(0);
    };
    var result = dialog.show();
     if (result === 2) {
        return showFirstRunDialog();
    }
}

function tryAddToMenu() {
    try {
        // This method works in some Photoshop versions
        var scriptFile = new File($.fileName);

        // Try to register the script
        if (typeof app.notifiers !== 'undefined') {
            // Method 1: Using notifiers (older PS versions)
            var eventID = app.charIDToTypeID("Rply");
            app.notifiers.add(eventID, scriptFile);
        }

        // Method 2: Try direct menu addition (limited success)
        // This usually requires restart to take effect
        var menuAction = {
            name: "NanoBanana",
            file: scriptFile
        };

        // The menu addition often requires Photoshop restart
        alert(t("scriptRegistered"));

    } catch (e) {
        alert(t("autoMenuAddFailed"));
    }
}

function createDesktopShortcut() {
    try {
        var scriptPath = $.fileName;
        var shortcutContent;

        if (CONFIG.IS_WINDOWS) {
            // Create .bat file for Windows
            var batFile = new File(Folder.desktop + "/nanobanana.bat");
            batFile.open("w");
            batFile.write('@echo off\\n');
            batFile.write('cd /d "' + File(app.path).parent.fsName + '"\\n');
            batFile.write('Photoshop.exe "' + scriptPath + '"\\n');
            batFile.close();

            alert(t("shortcutCreatedBat"));
        } else {
            // Create shell script for macOS
            var shellFile = new File(Folder.desktop + "/nanobanana.command");
            shellFile.open("w");
            shellFile.write('#!/bin/bash\\n');
            shellFile.write('osascript -e "tell application \\\"Adobe Photoshop 2024\\\" to do javascript (file \\\"' + scriptPath + '\\\")"');
            shellFile.close();

            // Try to make it executable
            app.system('chmod +x "' + shellFile.fsName + '"');

            alert(t("shortcutCreatedCommand"));
        }
    } catch (e) {
        alert(t("shortcutCreationFailed") + e.message);
    }
}

// ===== MAIN FUNCTION =====
function main() {
    var prefs = loadPreferences();
    CONFIG.LANG = prefs.language || 'ru'; // Use loaded language or default to 'ru'
    CONFIG.API_KEY = prefs.apiKey || null;


    // Check if this is the first run
    if (!prefs.firstRunComplete) {
        showFirstRunDialog();
        // Continue regardless of setup choice
    }

    // Get API key
    if (!CONFIG.API_KEY) {
        getAPIKey();
    }

    // Check document and selection
    if (!app.documents.length) {
        alert(t("open_image_first"));
        return;
    }


    var dialog = createDialog();
    var result = dialog.show();

    if (result === 2) { // Language changed
        main(); // Re-show the dialog
        return;
    }


    if (result == 1) {
        var prompt = dialog.promptInput.text;
        var modelName = dialog.modelDropdown.selection.text;
        var newDocument = dialog.newDocCheckbox.value;
        var upscale = dialog.upscaleCheckbox.value;
        var referenceFile = dialog.referenceFile;

        if (!prompt || prompt.length < 2) {
            alert(t("noPromptError"));
            return;
        }

        if (!hasActiveSelection()) {
            alert(t("noSelectionError"));
            return;
        }

        processSelection(prompt, modelName, newDocument, upscale, referenceFile);
    }
}

// ===== ADD SETTINGS MENU ITEM =====
function addSetupToSettings() {
    // Add a "Setup Shortcuts" option to the existing settings dialog
    // This would be integrated into your existing createDialog() function

    // In the settings button onClick handler, add:
    var setupShortcutBtn = settingsDialog.add("button", undefined, t("setupShortcutsButton"));
    setupShortcutBtn.alignment = "left";

    setupShortcutBtn.onClick = function () {
        settingsDialog.close();
        showFirstRunDialog();
    };
}


// ===== START SCRIPT =====
main();