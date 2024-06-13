export const ProjectSettings = {
    project: {
        description: {
            about: {
                description: "",
                projectId: "c2t4ge58468-wf5hj6hwgq-g345hb46nb",
                projectName: "Untitled",
                projectVersion: "1.0.0.0"
            },
            publisher: {
                companyName: "",
                companyDistinguishedName: "",
                homepage: "",
                supportContact: ""
            },
            legal: {
                copyrightNotice: "Fill out your copyright notice in the Description page of Project Settings",
                licensingTerms: "",
                privacyPolicy: ""
            },
            displayed: {
                projectDisplayedTitle: "",
                projectDebugTitleInfo: ""
            },
            settings: {
                shouldWindowPreserveAspectRatio: true,
                useBorderlessWindow: false,
                allowWindowResize: true,
                allowClose: true,
                allowMaximize: true,
                allowMinimize: true
            }
        },
        scenesAndModes: {
            defaultScenes: {
                gameDefaultScene: "",
                editorStartupMap: ""
            },
            defaultModes: {
                defaultGameMode: "MyGameMode",
                selectedGameMode: ""
            },
            gameInstance: {
                gameInstanceClass: "MyGameInstance"
            }
        }
    },
    engine: {
        audio: {
            engine: "Web Audio API",
            volume: 0.5
        },
        input: {
            
            keyboard: {
                up: "ArrowUp",
                down: "ArrowDown",
                left: "ArrowLeft",
                right: "ArrowRight"
            },
            mouse: {
                leftClick: true,
                rightClick: true
            },
            mappings: {
                
            }
        },
        physics: {
            engine: "Built-In",
            gravity: 9.81
        },
        rendering: {
            gameRendererElement: "game-renderer",
            uiRendererElement: "game-ui",
            resolution: {
                width: 1280,
                height: 720
            },
            frameRate: 60
        }
    }
};