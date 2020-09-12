#!/bin/bash

PS3='Choose your GCP environment: '
configPath=$(command gcloud info --format="get(config.paths.global_config_dir)")
configArr=($(command cd ${configPath} && cd ./configurations && ls))
configList=()
mailList=($(command cd ${configPath} && cd ./legacy_credentials && ls))
for CONFIG in "${configArr[@]}"
do
    configList+=("${CONFIG//config_}")
done

# Add  Create new config option & Quit
configList+=("New" "Quit")

select selectedEnv in "${configList[@]}"; do
    for i in "${!configList[@]}" 
    do 
        case $selectedEnv in
            ${configList[i]})
                if [[ ${configList[i]} == "Quit" ]]
                then 
                    printf "Bye bye 👋"
                    exit
                elif [[ ${configList[i]} == "New" ]]
                then 
                    while true; do
                        printf -- "Registred Google Accounts"
                        printf -- '\n';
                        for value in "${mailList[@]}"; do 
                            printf -- "- \e[34m${value}\e[0m"
                            printf -- '\n';
                        done
                        read -p "Is your Google Account already logged-in ? (Yy|Nn)" yn
                            case $yn in
                                [Yy]* ) 
                                printf -- "How do you want to name your new config ?"
                                printf -- " (Please do not use the word config)"
                                printf -- '\n';
                                read -p 'Configuration name: ' config_name
                                command gcloud config configurations create $config_name
                                printf -- '\n';
                                printf -- "\033[32m Your new configuration (\e[34m$config_name\e[0m is created ✅\033[0m\n";
                                printf -- "You're project :"
                                command gcloud projects list
                                printf -- "Type the PROJECT_ID you want\n"
                                read -p ' PROJECT_ID: ' project_id
                                command gcloud config set project $project_id
                                printf -- "\033[32m You have selected project: \e[34m$project_id 👌 \033[0m\n";
                                printf -- "Type your Google email :"
                                read -p ' Google email: ' email
                                printf -- "\033[32m Your email is: \e[34m$email 👌 \033[0m\n";
                                printf -- 'My work is completed ! Bye bye 👋'
                                break;;
                                [Nn]* ) 
                                command gcloud auth login
                                printf -- "\033[32m You're logged with your Google Account👌 \033[0m\n";
                                printf -- '\n';
                                printf -- "How do you want to name your new config ?"
                                printf -- "(Please do not use the word config)"
                                printf -- '\n';
                                read -p 'Configuration name: ' config_name
                                command gcloud config configurations create $config_name
                                printf -- "\033[32m Your new configuration (\e[34m$config_name\e[0m is created ✅\033[0m\n";
                                printf -- "You're project :"
                                command gcloud projects list
                                printf -- "Type the PROJECT_ID you want :"
                                read -p ' PROJECT_ID: ' project_id
                                command gcloud config set project $project_id
                                printf -- "\033[32m You have selected project: \e[34m$project_id 👌 \033[0m\n";
                                printf -- "Type your Google email :"
                                read -p ' Google email: ' email
                                printf -- "\033[32m Your email is: \e[34m$email 👌 \033[0m\n";
                                printf -- 'My work is completed ! Bye bye 👋'
                                break;;
                                * ) echo "Please answer yes or no.";;
                            esac
                    done
                    exit
                else
                    printf -- "\033[32m You have selected \e[34m$selectedEnv 👌 \033[0m\n";
                    command gcloud config configurations activate $selectedEnv
                    printf -- "\033[32m You're now working on \e[34m$selectedEnv ✅\033[0m\n";
                    exit
                fi
        esac
    done
done
