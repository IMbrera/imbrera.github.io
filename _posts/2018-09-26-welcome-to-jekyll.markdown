---
layout: post
title: Zabbix agent
date: '2022-02-14 17:02:16 +0300'
categories: jekyll update
published: false
---
### Для мониторинга windows-пк средствами zabbix - агента,после его установки, нужно вспомнить о файле конфигурации "C:\Program Files\Zabbix Agent".
_LogRemoteCommands=1
Server=192.168.xxx.xxx_
### после этого команды из сервера будут успешно обработаны на стороне клиента и переданы обратно на Zabbix.
> vfs.fs.size["C:",pfree]  
### этот ключ получает процент свободного места на диске. Для обработки узла создам шаблон
1. Сделаю автоматическое обнаружение: (Имя, Диапозон адреса укажу конкретно необходимый адрес 192.168.xxx.xxx, можно задать и группу 192.168.x-xxx.x-xxx, Интервал обновления, Проверка HTTP) добавив действие обнаружение (Имя, Условие: > Проверка обнаружения равно AgentRuleDetect: HTTP; Операции: Присоединение к шаблону);
2. Элементы данных (Имя, Тип: zabbix-агент, ключ: vfs.fs.size["C:",free], интервал обновления) и др. подобные ключи для мониторинга памяти средствами агента;
3. Триггер на обнаружение (Имя,Важность, **Выражение**).

### [Создать дейcтвие](https://www.zabbix.com/documentation/current/ru/manual/config/notifications/action)

> WMI
 
1.DNS
wmi.get[ROOT\CIMV2,SELECT DNSHostName FROM Win32_ComputerSystem]

2.Где я? (Из описания в ПК)
wmi.get[ROOT\CIMV2,SELECT Description FROM Win32_OperatingSystem]

3.Наличие службы - тег (Служба DrWEB) True
wmi.get[ROOT\CIMV2,SELECT Started FROM Win32_Service WHERE Name="DrWebEngine"]

4.Учетная запись
wmi.get[ROOT\CIMV2,SELECT Username FROM Win32_ComputerSystem]
![Снимок экрана 2022-06-23 151614.png]({{site.baseurl}}/images/Снимок экрана 2022-06-23 151614.png)
