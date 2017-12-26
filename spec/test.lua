--关联交易点击事件

--(function()
local nav = {}
local class = ".div_back_img"
--返回按钮方法
local function nav_back_fun(ctrl)
    local channel_id
    local page_code
    local relevance_flag = ert.static:get("relevance_flag")
    local relevance_trancode = ert.static:get("relevance_trancode")
    local current_page = ert.channel.current_page
    local click_params = ert(ctrl):attr("click_params")
    if click_params ~= nil and click_params ~= "" then
        if click_params == "true" then
            ert.channel:back(nil, nil, true)
        else
            if relevance_flag == "true" and current_page._trancode == relevance_trancode then
                ert.static:set("relevance_flag", "")
                ert.static:set("relevance_trancode", "")
                ert.channel:back(nil, nil, true)
            else
                local click_tab = cmm_unit_fun.format_lib:split_str(click_params, "|")
                channel_id = click_tab[1]
                page_code = click_tab[2]
                re_quest = click_tab[3]
                ert.channel:back(channel_id, page_code, re_quest)
            end
        end
    else
        if relevance_flag == "true" and current_page._trancode == relevance_trancode then
            ert.static:set("relevance_flag", "")
            ert.static:set("relevance_trancode", "")
            ert.channel:back(nil, nil, true)
        else
            ert.channel:back()
        end
    end
end
function binding_back()
    ert(class):click(
        function(ctrl)
            nav_back_fun(ctrl)
        end
    )
end

function binding_physical_back()
    window:setPhysicalkeyListener(
        "backspace",
        function()
            cmm_unit_fun.skip_lib:back_stop_timer()
            if ert(class)._has_ctrl == false then
                ert.channel:back()
            else
                local ctrl = ert(class):get_userdata()
                nav_back_fun(ctrl)
            end
        end
    )
end
binding_physical_back()
binding_back()

local x = 1
local x = 1

function this:trim(s)
    return (string.gsub(s, "^%s*(.-)%s*$", "%1"))
end

function this:no()
    window:hide(1)
    this.physicalkeyListeners = {["backspace"] = pageJump.backPage}
    this:setPhysicalkeyListeners()
end
