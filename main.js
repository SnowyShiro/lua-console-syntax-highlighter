const Prefix=/^[\0-\31\s]*/,Suffix=/[\0-\31\s]*/,Cleaner=/[\0-\31\s]+/;
const INDEX=/\.[\s\p{C}]*$/,CALL=/^\s*?\(/,METHOD=/:[\s\p{C}]*$/;
const UNICODE=/[\0\x01-\x7F\xC2-\xF4][\x80-\xBF]+/;
const NUMBER_A=/0[xX][\da-fA-F_]+/;
const NUMBER_B=/0[bB][01_]+/;
const NUMBER_C=/\d+\.?\d*[eE][+-]?\d+/;
const NUMBER_D=/\d+[._]?[\d_eE]*/;
const OPERATORS=/[:;<>/~*()\-={},.#^+%]+/;
const BRACKETS=/[\[\]]+/;
const IDEN=/[a-zA-Z_][\w]*/;
const STRING_EMPTY=/(['"])\1/;
const STRING_PLAIN=/(['"])[^\n]*?([^\\]\1)/;
const STRING_INTER=/`[^\n]*?`/;
const STRING_INCOMP_A=/(['"]).*?\n/;
const STRING_INCOMP_B=/(['"])[^\n]*/;
const STRING_MULTI=/\[(=*)\[.*?\]\0\]/;
const STRING_MULTI_INCOMP=/\[=*\[.*?.*/;
const COMMENT_MULTI=/--\[(=*)\[.*?\]\1\]/;
const COMMENT_MULTI_INCOMP=/--\[=*\[.*?.*/;
const COMMENT_PLAIN=/--.*?\n/;
const COMMENT_INCOMP=/--.*/;
const TYPED_VAR=/:\s*([a-zA-Z0-9?| \t]+\s*)/;
const ESCAPED=/\\[abfnrtvz'"\\]{1}|\\[0-9]{1,3}/g;
const lang={
    bool:{true:true,false:true},
    operator:{not:true,or:true},
    keyword:{
        and:true,break:true,do:true,else:true,elseif:true,
        end:true,for:true,function:true,if:true,in:true,
        local:true,repeat:true,return:true,then:true,
        until:true,while:true,continue:true,export:true,self:true
    },builtin:{
        // Lua Functions
        assert:true,collectgarbage:true,dofile:true,error:true,getfenv:true,
        getmetatable:true,ipairs:true,load:true,loadfile:true,loadstring:true,
        next:true,pairs:true,pcall:true,print:true,rawequal:true,
        rawget:true,rawset:true,select:true,setfenv:true,setmetatable:true,
        tonumber:true,tostring:true,type:true,unpack:true,xpcall:true,
        require:true,module:true,newproxy:true,gcinfo:true,
        // Lua Variables
        _G:true,_VERSION:true,
        // Lua Tables
        coroutine:true,package:true,string:true,table:true,math:true,io:true,os:true,debug:true,
        // Roblox Functions
        delay:true,Delay:true,elapsedTime:true,warn:true,rawlen:true,
        settings:true,spawn:true,tick:true,time:true,typeof:true,Version:true,
        UserSettings:true,wait:true,warn:true,ypcall:true,stats:true,Stats:true,
        PluginManager:true,DebuggerManager:true,printidentity:true,ElapsedTime:true,version:true,
        // Roblox Variables
        Enum:true,game:true,shared:true,script:true,workspace:true,plugin:true,File:true,
        // Roblox Tables
        Axes:true,BrickColor:true,CellId:true,CFrame:true,Color3:true,utf8:true,bit32:true,
        ColorSequence:true,ColorSequenceKeypoint:true,DateTime:true,Faces:true,
        DockWidgetPluginGuiInfo:true,Instance:true,NumberRange:true,PathWaypoint:true,
        NumberSequence:true,NumberSequenceKeypoint:true,PhysicalProperties:true,
        PluginDrag:true,Random:true,Ray:true,Rect:true,UDim:true,UDim2:true,
        Region3:true,Region3int16:true,TweenInfo:true,OverlapParams:true,task:true,
        Vector2:true,Vector2int16:true,Vector3:true,Vector3int16:true,Font:true,
        CatalogSearchParams:true,FloatCurveKey:true,RaycastParams:true,RotationCurveKey:true,
    },libraries:{
        // Lua Libs
        math:{
            abs:true,
            acos:true,
            asin:true,
            atan:true,
            atan2:true,
            ceil:true,
            clamp:true,
            cos:true,
            cosh:true,
            deg:true,
            exp:true,
            floor:true,
            fmod:true,
            frexp:true,
            ldexp:true,
            log:true,
            log10:true,
            max:true,
            min:true,
            modf:true,
            noise:true,
            pow:true,
            rad:true,
            random:true,
            randomseed:true,
            round:true,
            sign:true,
            sin:true,
            sinh:true,
            sqrt:true,
            tan:true,
            tanh:true,
            huge:true,
            pi:true,
        },
        string:{
            byte:true,
            char:true,
            find:true,
            format:true,
            gmatch:true,
            gsub:true,
            len:true,
            lower:true,
            match:true,
            pack:true,
            packsize:true,
            rep:true,
            reverse:true,
            split:true,
            sub:true,
            unpack:true,
            upper:true,
        },
        table:{
            clear:true,
            concat:true,
            foreach:true,
            foreachi:true,
            freeze:true,
            getn:true,
            insert:true,
            isfrozen:true,
            maxn:true,
            remove:true,
            sort:true,
            find:true,
            pack:true,
            unpack:true,
            move:true,
            create:true,
            clone:true,
        },
        debug:{
            info:true,
            profilebegin:true,
            profileend:true,
            resetmemorycategory:true,
            setmemorycategory:true,
            traceback:true,
            dumpheap:true,
            getconstants:true,
            getproto:true,
            loadmodule:true,
            setmetatable:true,
            getstack:true,
            getmetatable:true,
            getupvalues:true,
            getlocal:true,
            getfenv:true,
            getupvalue:true,
            getconstant:true,
            getlocals:true,
            setupvaluename:true,
            getprotos:true,
            setlocal:true,
            setstack:true,
            setproto:true,
            getinfo:true,
            setupvalue:true,
            setconstant:true,
            getregistry:true,
            validlevel:true
        },
        task:{
            wait:true,
            spawn:true,
            delay:true,
            cancel:true,
            defer:true,
            synchronize:true,
            desynchronize:true,
        },
        os:{
            time:true,
            date:true,
            difftime:true,
            clock:true,
        },
        coroutine:{
            close:true,
            create:true,
            isyieldable:true,
            resume:true,
            running:true,
            status:true,
            wrap:true,
            yield:true,
        },
        bit32:{
            arshift:true,
            band:true,
            bnot:true,
            bor:true,
            btest:true,
            bxor:true,
            countlz:true,
            countrz:true,
            extract:true,
            lrotate:true,
            lshift:true,
            replace:true,
            rrotate:true,
            rshift:true,
        },
        utf8:{
            char:true,
            codepoint:true,
            codes:true,
            graphemes:true,
            len:true,
            nfcnormalize:true,
            nfdnormalize:true,
            offset:true,
            charpattern:true,
        },
        // Roblox Libs
        Axes:{new:true},
        BrickColor:{
            new:true,
            New:true,
            Random:true,
            Black:true,
            Blue:true,
            DarkGray:true,
            Gray:true,
            Green:true,
            Red:true,
            White:true,
            Yellow:true,
            palette:true,
            random:true,
        },
        CatalogSearchParams:{new:true},
        CellId:{new:true},
        CFrame:{
            new:true,
            Angles:true,
            fromAxisAngle:true,
            fromEulerAnglesXYZ:true,
            fromEulerAnglesYXZ:true,
            fromMatrix:true,
            fromOrientation:true,
            lookAt:true,
            identity:true,
        },
        Color3:{
            new:true,
            fromRGB:true,
            fromHSV:true,
            fromHex:true,
            toHSV:true,
        },
        ColorSequence:{new:true},
        ColorSequenceKeypoint:{new:true},
        DateTime:{
            now:true,
            fromIsoDate:true,
            fromLocalTime:true,
            fromUniversalTime:true,
            fromUnixTimestamp:true,
            fromUnixTimestampMillis:true,
        },
        Font:{fromEnum:true,new:true},
        DockWidgetPluginGuiInfo:{new:true},
        Faces:{new:true},
        FloatCurveKey:{new:true},
        Instance:{new:true},
        NumberRange:{new:true},
        NumberSequence:{new:true},
        NumberSequenceKeypoint:{new:true},
        OverlapParams:{new:true},
        PathWaypoint:{new:true},
        PhysicalProperties:{new:true},
        PluginDrag:{new:true},
        Random:{new:true},
        Ray:{new:true},
        RaycastParams:{new:true},
        Rect:{new:true},
        Region3:{new:true},
        Region3int16:{new:true},
        RotationCurveKey:{new:true},
        TweenInfo:{new:true},
        UDim:{new:true},
        UDim2:{
            new:true,
            fromScale:true,
            fromOffset:true,
        },
        Vector2:{
            new:true,
            one:true,
            xAxis:true,
            yAxis:true,
            zero:true,
        },
        Vector2int16:{new:true},
        Vector3:{
            new:true,
            fromAxis:true,
            FromAxis:true,
            fromNormalId:true,
            FromNormalId:true,
            one:true,
            xAxis:true,
            yAxis:true,
            zAxis:true,
            zero:true,
        },
        Vector3int16:{new:true},
        Enum:{},
    }
};
const{operator:lua_op,bool:lua_bool,keyword:lua_keyword,builtin:lua_builtin,libraries:lua_libraries}=lang;
const lua_matches=[
    // Indentifiers
    [new RegExp(Prefix.source+IDEN.source+Suffix.source),'Var'],
    [new RegExp(Prefix.source+TYPED_VAR.source+Suffix.source),'Method'],
    // Numbers
    [new RegExp(Prefix.source+NUMBER_A.source+Suffix.source),'Number'],
    [new RegExp(Prefix.source+NUMBER_B.source+Suffix.source),'Number'],
    [new RegExp(Prefix.source+NUMBER_C.source+Suffix.source),'Number'],
    [new RegExp(Prefix.source+NUMBER_D.source+Suffix.source),'Number'],
    // Strings
    [new RegExp(Prefix.source+STRING_EMPTY.source+Suffix.source),'String'],
    [new RegExp(Prefix.source+STRING_PLAIN.source+Suffix.source),'String'],
    [new RegExp(Prefix.source+STRING_INCOMP_A.source+Suffix.source),'String'],
    [new RegExp(Prefix.source+STRING_INCOMP_B.source+Suffix.source),'String'],
    [new RegExp(Prefix.source+STRING_MULTI.source+Suffix.source),'String'],
    [new RegExp(Prefix.source+STRING_MULTI_INCOMP.source+Suffix.source),'String'],
    [new RegExp(Prefix.source+STRING_INTER.source+Suffix.source),'Interpolation'],
    // Comments
    [new RegExp(Prefix.source+COMMENT_MULTI.source+Suffix.source),'Comment'],
    [new RegExp(Prefix.source+COMMENT_MULTI_INCOMP.source+Suffix.source),'Comment'],
    [new RegExp(Prefix.source+COMMENT_PLAIN.source+Suffix.source),'Comment'],
    [new RegExp(Prefix.source+COMMENT_INCOMP.source+Suffix.source),'Comment'],
    // Operators
    [new RegExp(Prefix.source+OPERATORS.source+Suffix.source),'Operator'],
    [new RegExp(Prefix.source+BRACKETS.source+Suffix.source),'Operator'],
    // Unicode
    [new RegExp(Prefix.source+UNICODE.source+Suffix.source),'Iden'],
    // Unknown
    [/(^.)/,'Iden'],
];
const REGEXES=[],TOKENS=[];
for(const[regex,token]of lua_matches){
    REGEXES.push(regex);
    TOKENS.push(token);
};
const variable='Var',keyword='Keyword',builtin='BuiltIn',iden='Text',method='Method',operator='Operator',comment='Comment',global='Global',bool='Bool',nil='Nil',nil2='nil',local='local',func='function';
const lexer=function*(str,locals={}){// yields [ token, token_source ]
	if(!str)return;
	let index=0,size=str.length;
    let method_start=-1,line_breaks=[];
    let last_token1='',last_token2='';
    let last_content1='',last_content2='',last_content3='';
    while(index<=size){
        if(method_start!=-1)yield[method,str.substring(method_start--,index)];
        if(line_breaks.length>0)yield[last_token1,line_breaks.shift()+(line_breaks.length==0?'':'\n')];
        let matched=false;
        for(const ind in REGEXES){
            const regex=REGEXES[ind];
            const match=regex.exec(str.substring(index));
            if(!match)continue;
            const{index:mindex,0:m0}=match;
            const start=mindex+index,finish=start+m0.length;
            index=finish;
            matched=true;
            let content=str.substring(start,finish);
            const raw_token=TOKENS[ind];
            let processed_token=raw_token;
            if(raw_token==variable){
                const clean_content=content.replace(Cleaner,'');
                if(clean_content==nil2)processed_token=nil;
                else if(last_token1==operator&&METHOD.test(last_content1))processed_token=method;
                else if(last_token1==keyword&&!content.includes(func)&&processed_token!=operator){
                    if(last_content1.includes(local)||last_content2.includes(local))locals[clean_content]=true;
                    if(last_content1.includes(func))processed_token=locals[clean_content]?method:global;
                }else if(processed_token==method){
                    method_start=start;
                    yield[operator,':'];
                    break;
                }else if(processed_token==operator&&content[1]=='-'&&content[2]=='-'){
                    index-=content.length-1;
                    yield[operator,content[0]];
                    break;
                };
                if(processed_token==variable){
                    if(locals[clean_content])processed_token=CALL.test(str.substring(index))?method:iden;
                    else if(lua_bool[clean_content])processed_token=bool;
                    else if(lua_op[clean_content])processed_token=operator;
                    else if(lua_keyword[clean_content])processed_token=keyword;
                    else if(lua_builtin[clean_content])processed_token=builtin;
                    else if(CALL.test(str.substring(index)))processed_token=global
                    else processed_token=iden;
                    if(INDEX.test(last_content1)&&last_token1!=comment&&!INDEX.test(last_content3)){
                        const parent=last_content2.replace(Cleaner,'');
                        const lib=lua_libraries[parent];
                        if(processed_token==global)processed_token=(last_token2==builtin)?builtin:method;
                        else if(lib&&lib[clean_content])processed_token=builtin;
                        else processed_token=iden;
                    };
                };
            }else if(raw_token=='Interpolation'){
                if(!/[^\\]{/.test(content))processed_token='String';
                else{
                    processed_token=undefined;
                    let is_string=true,sub_index=0,sub_size=content.length;
                    while(sub_index<=sub_size){
                        const sub_match=/^.*?[^\\][{}]/.exec(content.substring(sub_index));
                        if(!sub_match){
                            yield['String',content.substring(sub_index)];
                            break;
                        };
                        const{index:smindex,0:sm0}=sub_match;
                        const sub_start=smindex+sub_index,sub_finish=sub_start+sm0.length;
                        if(is_string){
                            sub_index=sub_finish;
                            yield['String',content.substring(sub_start,sub_finish)];
                            is_string=false;
                        }else{
                            sub_index=sub_finish-1;
                            const sub_content=content.substring(sub_start,sub_finish-1);
                            for(const inner of lexer(sub_content))yield inner;
                            is_string=true;
                        };
                    };
                };
            }else if(raw_token=='String'){
                processed_token=undefined;
                let sub_index=0,sub_size=content.length;
                while(sub_index<=sub_size){
                    const sub_match=ESCAPED.exec(content);
                    if(!sub_match){
                        yield['String',content.substring(sub_index)];
                        break;
                    };
                    const{index:sub_start,0:sm0}=sub_match;
                    yield['String',content.substring(sub_index,sub_start)];
                    sub_index=sub_start+sm0.length;
                    yield['Escaped',sm0];
                };
            };
            const l_breaks=content.split('\n');
            if(l_breaks.length>1)content=l_breaks.shift()+'\n',line_breaks=l_breaks;
            last_content3=last_content2,last_content2=last_content1,last_content1=content;
            last_token2=last_token1,last_token1=processed_token||raw_token;
            if(processed_token)yield[processed_token,content];
            break;
        };
        if(!matched)return;
    };
};
/**
 * returns string with the ansi color codes so you can console.log it.
 * @param {String} fg - foreground color in hex. has to start with a "#"
 * @param {String} str - string to be colored
 * @param {String} bg - optional background color in hex. has to start with a "#"
 * @returns 
 */
function color(fg,str,bg){
	fg=fg?`\x1b[38;2;${parseInt(fg.substring(1,3),16)};${parseInt(fg.substring(3,5),16)};${parseInt(fg.substring(5,7),16)}m`:'';
	bg=bg?`\x1b[48;2;${parseInt(bg.substring(1,3),16)};${parseInt(bg.substring(3,5),16)};${parseInt(bg.substring(5,7),16)}m`:'';
	return bg+fg+(str||'');
};
const Themes={
    onedarkpro:{
        Text:'#F86D7C',
        Keyword:'#C678DD',
        BuiltIn:'#56B6C2',
        String:'#98C379',
        Interpolation:'#98C379',
        Number:'#D19A66',
        Bool:'#D19A66',
        Comment:'#7F848E',
        Operator:'#CCCCCC',
        Method:'#61AFEF',
        Global:'#E5C07B',
        Nil:'#D19A66',
        Escaped:'#58B4C0',
        Background:'#282C34'
    },
    monokaipro:{
        Text:'#F7F1FF',
        Keyword:'#FC618D',
        BuiltIn:'#7BD88F',
        String:'#FCE566',
        Interpolation:'#FCE566',
        Number:'#948AE3',
        Bool:'#948AE3',
        Comment:'#69676C',
        Operator:'#F7F1FF',
        Method:'#7BD88F',
        Global:'#F7F1FF',
        Nil:'#948AE3',
        Escaped:'#948AE3',
        Background:'#222222'
    },
};
/**
 * highlights lua code that you can console.log. themes: `onedarkpro`, `monokaipro`. default is `onedarkpro`
 * @param {String} source - string to highlight
 * @param {JSON|String} theme - if string then uses that theme, elseif json uses that for the theming
 * @returns {String} colored string that you can console.log
 */
function highlight(source,theme,locals){
    const syntax=typeof theme=='string'?Themes[theme]||Themes.onedarkpro:typeof theme=='object'?theme:Themes.onedarkpro;
    let out=color(null,'',syntax.Background),last_token;
    for(const[token,src]of lexer(source,locals)){
        if(!syntax[token])console.log('No color for token:',token);
        if(/\r\n$/.test(src))out+='\x1b[K';
        if(last_token==token)out+=src;
        else{
            last_token=token;
            out+=color(syntax[token]||syntax.Text,src);
        };
    };
    return out+'\x1b[K\x1b[0m';
};
module.exports={highlight,lexer};