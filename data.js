const LANGS={
ko:{name:"한국어",norm:nKo,
  ui:{h1:"음식물쓰레기? <span>일반쓰레기?</span> 어디에버리지?",sub:"음식 품목을 입력하면 어떻게 버려야하는지 알려드립니다.",slb:"품목명으로 검색",ph:"예: 달걀껍데기, 수박, 생선뼈...",btn:"확인 ↗",how:"버리는 방법",clbl:"예시 검색어",empty:"항목을 입력하면\n어느 쓰레기통인지 알려드려요.",nf:q=>`"${q}" 검색 결과가 없습니다.`,fine:"올바른 쓰레기봉투를 사용하지 않으면 최대 <strong>₩1,000,000</strong> 과태료가 부과됩니다.",tl:{food:"음식물쓰레기",general:"일반쓰레기",special:"특수처리"},bl:{food:"음식물쓰레기 전용용기",general:"종량제봉투",special:""},
      slogan: "생활폐기물 배출안내 서비스",highlight: "검색 한 번으로 쉽고 빠르게 안내합니다.",quick1Title: "생활환경",quick1Sub: "환경정보",quick2Title: "민원안내",quick2Sub: "생활민원",quick3Title: "다국어",quick3Sub: "5 Languages",dongguTitle: "부산 동구 공식누리집",dongguSub: "음식물류폐기물 배출안내 바로가기 →"},
  sg:["달걀껍데기","생선뼈","김치","바나나껍질","닭뼈","커피찌꺼기","식빵","수박","폐식용유","된장","밥","배추"],
  db:[
    {t:["파뿌리","양파껍질","마늘껍질","양파뿌리","마늘뿌리","대파뿌리"],c:"general",d:"파·마늘·양파 뿌리 및 껍질",s:["종량제봉투에 넣어 배출","단단하고 섬유질이 많아 음식물쓰레기 불가"]},
    {t:["옥수수껍질","옥수수수염","옥수수대"],c:"general",d:"옥수수 껍질,대 및 수염",s:["종량제봉투에 넣어 배출"]},
    {t:["파인애플껍질","코코넛껍질","파인애플","코코넛"],c:"general",d:"파인애플·코코넛 껍질",s:["종량제봉투에 넣어 배출"]},
    {t:["호두껍질","밤껍질","땅콩껍질","도토리껍질","견과류"],c:"general",d:"견과류 껍질 (호두·밤·땅콩·도토리)",s:["종량제봉투에 넣어 배출"]},
    {t:["달걀껍데기","계란껍데기","메추리알껍데기","달걀껍질"],c:"general",d:"달걀·메추리알 껍데기",s:["종량제봉투에 넣어 배출","달걀 내용물(알 속)만 음식물쓰레기 가능"]},
    {t:["티백","녹차티백","사용한티백","차"],c:"general",d:"사용한 티백 (건조 후)",s:["충분히 건조 후 종량제봉투에 배출"]},
    {t:["커피찌꺼기","원두찌꺼기","커피가루","커피"],c:"general",d:"커피 찌꺼기 (건조 후)",s:["완전히 건조시킨 후 종량제봉투에 배출"]},
    {t:["반려동물사료","개사료","고양이사료","건식사료","사료"],c:"general",d:"반려동물 건식 사료",s:["종량제봉투에 넣어 배출"]},
    {t:["돼지뼈","소뼈","닭뼈","사골","큰뼈","뼈"],c:"general",d:"큰 뼈 (돼지·소·닭)",s:["종량제봉투에 넣어 배출","작은 연한 고기 조각·지방 → 음식물쓰레기"]},
    {t:["조개껍데기","굴껍데기","전복껍데기","새우껍질","게껍질","홍합"],c:"general",d:"조개·굴·전복·새우·게 등 껍데기",s:["딱딱한 껍데기는 종량제봉투에 배출","대량으로 배출 시에는 20리터 불연성 전용마대 사용"]},
    {t:["생선뼈","생선가시","날카로운지느러미","가시"],c:"general",d:"생선 뼈 및 날카로운 지느러미",s:["종량제봉투에 넣어 배출","내장·살 등 부드러운 부위 → 음식물쓰레기"]},
    {t:["유통기한지난라면","건면","인스턴트라면","안익힌라면","라면"],c:"general",d:"유통기한 지난 건면·라면 (미조리)",s:["종량제봉투에 넣어 배출"]},
    {t:["복숭아씨","망고씨","체리씨","포도씨","수박씨","과일씨"],c:"general",d:"과일 씨앗·핵 (복숭아·망고·체리 등)",s:["딱딱한 씨앗은 종량제봉투에 배출"]},
    {t:["한약재","한약재찌꺼기","건조한약재"],c:"general",d:"건조 한약재 찌꺼기",s:["종량제봉투에 넣어 배출"]},
    {t:["고추씨","고추씨앗","고추대","쪽파뿌리","미나리뿌리","옥수수대","왕겨","완두콩껍질","완두콩꼬투리","호랑이콩껍질"],c:"general",d:"동물이 섭취하기 어려운 껍질·대·뿌리(고추대·옥수수대·완두콩껍질·호랑이콩껍질)",s:["종량제봉투에 배출","단단하거나 섬유질이 많아 음식물쓰레기 불가"]},
    {t:["사과껍질","배껍질","수박껍질","수박","바나나껍질","바나나","귤껍질","오렌지껍질","레몬껍질","멜론껍질"],c:"food",d:"과일 껍질 (사과·배·수박·바나나·귤 등)",s:["수분 최대한 제거","큰 조각(수박껍질 등)은 잘게 썰기","이물질 제거 후 음식물쓰레기 전용용기에 배출"]},
    {t:["딸기꼭지","딸기"],c:"food",d:"딸기 꼭지",s:["수분 제거 후 음식물쓰레기 전용용기에 배출"]},
    {t:["말린망고","소프트건조과일","건조과일"],c:"food",d:"부드러운 건조과일 (말린 망고 등)",s:["음식물쓰레기 전용용기에 배출"]},
    {t:["배추","무","김치","깍두기"],c:"food",d:"배추·무·김치 찌꺼기",s:["수분을 최대한 꽉 짜낸 후 배출","음식물쓰레기 전용용기에 넣어 배출"]},
    {t:["파잎","대파잎","부추","야채자투리","채소자투리","채소"],c:"food",d:"파 잎·줄기 및 채소 자투리 (연한 부분)",s:["뿌리·껍질 → 종량제봉투","연한 부분은 수분 제거 후 음식물쓰레기 전용용기에 배출"]},
    {t:["달걀흰자","달걀노른자","계란내용물","달걀속"],c:"food",d:"달걀·메추리알 내용물 (속만)",s:["껍데기 → 종량제봉투","알 속 내용물만 음식물쓰레기 전용용기에 배출"]},
    {t:["남은음식","음식찌꺼기","밥","국","찌개","잔반","상한음식"],c:"food",d:"음식 찌꺼기·잔반 (익힌 음식 포함)",s:["국물 등 액체 먼저 제거","수분을 최대한 짜낸 후 배출","이물질(이쑤시개·포장재) 제거","음식물쓰레기 전용용기에 배출"]},
    {t:["된장","고추장","쌈장","발효장류"],c:"food",d:"된장·고추장·쌈장 등 발효 장류",s:["음식물쓰레기 전용용기에 배출"]},
    {t:["간장","젓갈","발효양념","절임채소"],c:"food",d:"간장·발효 양념·젓갈·절임 채소",s:["액체는 먼저 따라 버린 후 배출","음식물쓰레기 전용용기에 배출"]},
    {t:["빵","케이크","식빵","페이스트리"],c:"food",d:"빵·케이크·부드러운 베이커리",s:["액체 있으면 먼저 제거","음식물쓰레기 전용용기에 배출"]},
    {t:["지방","생고기","고기자투리","고기"],c:"food",d:"다듬은 지방 및 생고기 자투리",s:["큰 뼈 → 종량제봉투","부드러운 작은 조각·지방 → 음식물쓰레기 전용용기에 배출"]},
    {t:["생선내장","생선자투리","연한생선살","생선"],c:"food",d:"생선 내장 및 연한 생선 살",s:["생선뼈·날카로운 지느러미 → 종량제봉투","내장·연한 부위 → 음식물쓰레기 전용용기에 배출"]},
    {t:["폐식용유","사용한식용유","기름","식용유"],c:"special",d:"폐식용유",s:["소량: 신문지나 키친타월에 흡수 후 종량제봉투에 배출","대량: 전문 폐기물 처리 업체에 연락","아파트 내 폐유 수거함에 배출 (관리실 확인)"]},
    {t:["쌀","묵은쌀","오래된쌀","생쌀","백미","현미"],c:"food",d:"쌀,묵은 쌀, 오래된 쌀, 생쌀, 잡곡, 현미",s:["음식물쓰레기 전용용기에 배출"]},
    {t:["감자","싹이 난 감자","고구마","상한고구마"],c:"food",d:"감자, 싹이 난 감자, 고구마, 상한 고구마",s:["음식물쓰레기 전용봉투에 배출"]}
  ]
},
    
en:{name:"English",norm:nEn,
  ui:{h1:"General Waste?Food Waste? <span>Where Should I Throw It? </span>",sub:"Enter an item name to find the correct disposal method.",slb:"Search by item",ph:"e.g. eggshell, watermelon, fish bone...",btn:"Search ↗",how:"How to dispose",clbl:"Try these",empty:"Enter a food item above\nto check which bin it goes in.",nf:q=>`No match found for "${q}".`,fine:"Improper disposal can result in fines up to <strong>₩1,000,000</strong>. Always use the correct bag.",tl:{food:"Food waste",general:"General waste",special:"Special disposal"},bl:{food:"Food waste bag",general:"Standard waste bag",special:""},
  slogan:"Food Waste Disposal Guide",highlight:"Find disposal information quickly with just one search.",quick1Title:"Environment",quick1Sub:"Environmental Information",quick2Title:"Civil Services",quick2Sub:"Resident Services",quick3Title:"Languages",quick3Sub:"5 Languages",dongguTitle:"Busan Dong-gu Official Website",dongguSub:"Food Waste Disposal Guide →"},
  sg:["eggshell","fish bone","kimchi","banana peel","chicken bone","coffee grounds","bread","watermelon","cooking oil","doenjang","cooked rice","cabbage"],
  db:[
    {t:["green onion root","onion skin","garlic skin","onion root","garlic root","onion","garlic"],c:"general",d:"Onion / garlic roots & outer skins",s:["Place in standard waste bag (종량제봉투)","Fibrous roots and dry skins cannot go in food waste"]},
    {t:["corn husk","corn silk","corn"],c:"general",d:"Corn husks & corn silk",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["pineapple shell","coconut shell","pineapple","coconut"],c:"general",d:"Pineapple & coconut shells",s:["Place in standard waste bag (종량제봉투)","Hard shells are not accepted in food waste bins"]},
    {t:["walnut shell","chestnut shell","peanut shell","nut shell","walnut","chestnut","peanut","acorn"],c:"general",d:"Nut shells (walnut, chestnut, peanut, acorn)",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["eggshell","egg shell","quail egg shell"],c:"general",d:"Egg & quail egg shells",s:["Place in standard waste bag (종량제봉투)","Only egg contents (inside) → food waste bin"]},
    {t:["tea bag","used tea bag","teabag"],c:"general",d:"Used tea bags (dried)",s:["Dry the tea bag first","Place in standard waste bag (종량제봉투)"]},
    {t:["coffee grounds","coffee ground","coffee"],c:"general",d:"Coffee grounds (dried)",s:["Dry thoroughly first","Place in standard waste bag (종량제봉투)"]},
    {t:["pet food","dog food","cat food","kibble"],c:"general",d:"Pet food (dog/cat) & dried kibble",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["pork bone","beef bone","chicken bone","large bone","bone","bones"],c:"general",d:"Large bones (pork, beef, chicken)",s:["Place in standard waste bag (종량제봉투)","Small soft meat pieces & fat → food waste bin"]},
    {t:["clam shell","oyster shell","crab shell","shrimp shell","shellfish","mussel","abalone shell"],c:"general",d:"Shellfish shells (clam, oyster, crab, shrimp...)",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["fish bone","fish fin","fishbone","fish spine"],c:"general",d:"Fish bones & sharp fish fins",s:["Place in standard waste bag (종량제봉투)","Fish innards & soft scraps → food waste bin"]},
    {t:["instant noodles","expired noodles","uncooked noodles","ramen"],c:"general",d:"Expired & uncooked instant noodles",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["peach pit","mango pit","cherry pit","fruit pit","grape seed","watermelon seed"],c:"general",d:"Hard fruit pits & seeds",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["dried herbal medicine","herb medicine","herbal residue"],c:"general",d:"Dried herbal medicine residue",s:["Place in standard waste bag (종량제봉투)"]},
    {t:["pepper seed","pepper seeds","pepper stem","scallion root","water parsley root","corn stalk","rice husk","pea pod","pea shell","hyacinth bean pod"],c:"general",d:"Hard shells, stems and fibrous plant parts",s:["Place in standard waste bag (종량제봉투)","Too hard or fibrous for animal feed and food-waste recycling"]},
    {t:["apple peel","pear peel","banana peel","watermelon rind","watermelon","melon peel","orange peel","lemon peel","mandarin peel","citrus peel","banana","apple"],c:"food",d:"Fruit peels (apple, pear, banana, watermelon, citrus...)",s:["Remove excess moisture","Cut large pieces small (e.g. watermelon rind)","Remove toothpicks or non-food items","Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["strawberry top","strawberry"],c:"food",d:"Strawberry tops",s:["Remove moisture","Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["soft dried fruit","dried mango"],c:"food",d:"Soft dried fruits (dried mango etc.)",s:["Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["cabbage","radish","kimchi"],c:"food",d:"Cabbage, radish & kimchi scraps",s:["Squeeze out excess moisture thoroughly","Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["green onion top","green onion stem","vegetable trimming","soft vegetable"],c:"food",d:"Green onion tops & soft vegetable trimmings",s:["Roots & skins → standard waste bag","Soft parts: squeeze moisture, place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["egg content","egg yolk","egg white","egg inside","egg"],c:"food",d:"Egg contents (yolk & white only)",s:["Eggshells → standard waste bag","Only the inside contents → food waste bag (음식물쓰레기 전용용기)"]},
    {t:["leftovers","cooked food","spoiled food","expired food","rice","soup","stew","cooked rice"],c:"food",d:"Cooked leftovers & spoiled food",s:["Drain all liquids first","Squeeze out moisture","Remove foreign objects (toothpicks, packaging)","Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["doenjang","gochujang","ssamjang","fermented paste","miso"],c:"food",d:"Fermented pastes (doenjang, gochujang, ssamjang)",s:["Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["soy sauce","pickled vegetable","fermented condiment","jeotgal"],c:"food",d:"Soy sauce, fermented condiments & pickled vegetables",s:["Drain excess liquid first","Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["bread","cake","baked goods","pastry"],c:"food",d:"Bread & soft baked goods",s:["Drain any liquids","Place in food waste bag (음식물쓰레기 전용용기)"]},
    {t:["trimmed fat","raw meat","meat scrap","meat fat"],c:"food",d:"Trimmed fat & raw meat scraps",s:["Large bones → standard waste bag","Small soft pieces & fat → food waste bag (음식물쓰레기 전용용기)"]},
    {t:["fish innard","fish entrail","soft fish","fish scrap"],c:"food",d:"Fish innards & soft fish scraps",s:["Fish bones & sharp fins → standard waste bag","Soft parts → food waste bag (음식물쓰레기 전용용기)"]},
    {t:["cooking oil","waste cooking oil","used oil","oil"],c:"special",d:"Waste cooking oil",s:["Small amounts: absorb with paper towel/newspaper → standard waste bag","Large amounts: contact a licensed professional waste disposal company","Collection box: deliver to designated waste oil box (check with apartment management)"]},
    {t:["rice","old rice","stale rice","uncooked rice","white rice","brown rice"],c:"food",d:"Rice,old rice, uncooked rice",s:["Dispose of in a food waste container."]},
    {t:["potato","sprouted potato","sweet potato","spoiled sweet potato"],c:"food",d:"Potato,sprouted potato,sweet potato,spoiled sweet potato",s:["Dispose of in a food waste bag."]}
  ]
},

zh:{name:"中文",norm:nZh,
  ui:{h1:"一般垃圾？食物垃圾？ <span>该扔到哪里？</span>",sub:"输入食物名称，即可查询应放入哪个垃圾桶及处理方法。",slb:"按物品名称搜索",ph:"例：蛋壳、西瓜、鱼骨...",btn:"查询 ↗",how:"处理方法",clbl:"常用搜索",empty:"请在上方输入食物名称\n查看应放入哪个垃圾桶。",nf:q=>`未找到"${q}"的相关结果。`,fine:"违规投放垃圾最高可被罚款 <strong>₩1,000,000</strong>。请务必使用正确的垃圾袋。",tl:{
  food:"食物垃圾", general:"一般垃圾", special:"特殊处理"},bl:{food:"食物垃圾袋",general:"计量垃圾袋",special:""},
     slogan:"生活垃圾分类指南",highlight:"只需搜索一次，即可快速获取分类信息。",quick1Title:"生活环境",quick1Sub:"环境信息",quick2Title:"便民服务",quick2Sub:"生活服务",quick3Title:"多语言",quick3Sub:"5种语言",dongguTitle:"釜山东区官方网站",dongguSub:"厨余垃圾分类指南 →"},
  sg:["蛋壳","鱼骨","泡菜","香蕉皮","鸡骨","咖啡渣","面包","西瓜","废食用油","大酱","剩饭","卷心菜"],
  db:[
    {t:["葱根","洋葱皮","蒜皮","蒜根","葱","洋葱","大蒜"],c:"general",d:"葱·蒜·洋葱的根部和外皮",s:["放入计量垃圾袋 (종량제봉투)","根部和干皮不可放入食物垃圾桶"]},
    {t:["玉米皮","玉米须","玉米"],c:"general",d:"玉米皮和玉米须",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["菠萝皮","椰子壳","菠萝","椰子"],c:"general",d:"菠萝皮和椰子壳",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["核桃壳","栗子壳","花生壳","坚果壳","核桃","栗子","花生"],c:"general",d:"坚果壳（核桃·栗子·花生·橡子）",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["蛋壳","鸡蛋壳","鹌鹑蛋壳"],c:"general",d:"鸡蛋·鹌鹑蛋壳",s:["放入计量垃圾袋 (종량제봉투)","蛋液（蛋壳内部）→ 食物垃圾袋"]},
    {t:["茶包","用过茶包","茶叶"],c:"general",d:"用过的茶包（干燥后）",s:["晾干后放入计量垃圾袋 (종량제봉투)"]},
    {t:["咖啡渣","咖啡粉","咖啡"],c:"general",d:"咖啡渣（干燥后）",s:["完全晾干后放入计量垃圾袋 (종량제봉투)"]},
    {t:["宠物粮","狗粮","猫粮","干狗粮"],c:"general",d:"宠物干粮（狗/猫）",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["猪骨","牛骨","鸡骨","大骨头","骨头"],c:"general",d:"大骨头（猪·牛·鸡）",s:["放入计量垃圾袋 (종량제봉투)","小块软肉和脂肪 → 食物垃圾袋"]},
    {t:["蛤蜊壳","牡蛎壳","虾壳","蟹壳","贝壳","贝类","鲍鱼壳"],c:"general",d:"贝壳类外壳（蛤蜊·牡蛎·虾·蟹等）",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["鱼骨","鱼刺","鱼鳍"],c:"general",d:"鱼骨和鱼鳍",s:["放入计量垃圾袋 (종량제봉투)","鱼内脏和软质鱼肉 → 食物垃圾袋"]},
    {t:["方便面","过期面","未煮面","速食面","拉面"],c:"general",d:"过期/未煮方便面",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["果核","桃核","芒果核","樱桃核","葡萄籽","西瓜籽"], c:"general", d:"坚硬的果核（桃子、芒果、樱桃等）", s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["中药渣","干中药","药材"],c:"general",d:"干燥中药材残渣",s:["放入计量垃圾袋 (종량제봉투)"]},
    {t:["苹果皮","梨皮","香蕉皮","西瓜皮","西瓜","橘皮","橙皮","柠檬皮","瓜皮","水果皮","香蕉","苹果"],c:"food",d:"水果皮（苹果·梨·香蕉·西瓜·柑橘等）",s:["沥干多余水分","大块切小后再投放","去除牙签等异物","放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["草莓蒂","草莓"],c:"food",d:"草莓蒂",s:["沥干后放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["芒果干","软质干果"],c:"food",d:"软质干果（芒果干等）",s:["放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["卷心菜","白萝卜","泡菜"],c:"food",d:"卷心菜·白萝卜·泡菜碎",s:["充分挤干水分","放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["葱叶","葱茎","蔬菜碎","软质蔬菜"],c:"food",d:"葱叶·葱茎及软质蔬菜碎",s:["根部/外皮 → 计量垃圾袋","软质部分挤干后放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["蛋液","蛋黄","蛋白","鸡蛋"],c:"food",d:"蛋液（仅蛋壳内部分）",s:["蛋壳 → 计量垃圾袋","蛋液放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["剩菜","剩饭","米饭","汤","炖菜","熟食","变质食物"],c:"food",d:"熟食剩菜·变质食物",s:["先倒掉所有液体","充分挤干水分","去除牙签·包装等异物","放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["大酱","辣椒酱","包饭酱","된장","고추장"],c:"food",d:"发酵酱料（大酱·辣酱·包饭酱）",s:["放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["酱油","腌制蔬菜","发酵调味料"],c:"food",d:"酱油·发酵调味料·腌制蔬菜",s:["先倒掉多余液体","放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["辣椒籽","辣椒种子","辣椒梗","小葱根","水芹根","玉米秆","稻壳","豌豆荚","豌豆壳","扁豆壳"],c:"general",d:"动物难以食用的硬壳、根茎及纤维质部分",s:["放入计量垃圾袋 (종량제봉투)","质地坚硬或纤维过多，不属于食物垃圾"]},
    {t:["面包","蛋糕","烘焙"],c:"food",d:"面包·蛋糕·软质烘焙食品",s:["倒掉液体（如有）","放入食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["脂肪","生肉","肉碎","肉"],c:"food",d:"修剪脂肪和生肉碎",s:["大骨头 → 计量垃圾袋","小块软肉和脂肪 → 食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["鱼内脏","鱼肠","软质鱼肉","鱼"],c:"food",d:"鱼内脏和软质鱼肉",s:["鱼骨·鱼鳍 → 计量垃圾袋","软质部分 → 食物垃圾袋 (음식물쓰레기 전용용기)"]},
    {t:["废食用油","废弃食用油","食用油","油"], c:"special", d:"废弃食用油", s:["少量：用报纸或纸巾吸附后放入计量垃圾袋", "大量：联系有资质的专业废弃物处理公司", "废油回收箱（咨询物业）"]},
    {t:["大米","陈米","旧米","生米","白米","糙米"],c:"food",d:"大米, 陈米,旧米,生米,白米,糙米",s:["请放入厨余垃圾专用容器。"]},
    {t:["土豆","发芽土豆","红薯","变质红薯"],c:"food",d:"土豆,发芽土豆,红薯,变质红薯",s:["请放入厨余垃圾专用袋。"]}
  ]
},

vi:{name:"Tiếng Việt",norm:nVi,
  ui:{h1:"Rác Thường Hay Rác Thực Phẩm? <span>Bỏ Vào Đâu?</span>",sub:"Nhập tên thực phẩm để biết nên bỏ vào thùng rác nào và cách xử lý đúng.",slb:"Tìm kiếm theo tên mục",ph:"Ví dụ: vỏ trứng, dưa hấu, xương cá...",btn:"Kiểm tra ↗",how:"Cách vứt rác",clbl:"Gợi ý tìm kiếm",empty:"Nhập tên thực phẩm ở trên\nđể kiểm tra nên bỏ vào thùng rác nào.",nf:q=>`Không tìm thấy kết quả cho "${q}".`,fine:"Vứt rác sai quy định có thể bị phạt đến <strong>₩1.000.000</strong>. Luôn dùng đúng loại túi rác.",tl:{food:"Rác thực phẩm",general:"Rác thường",special:"Xử lý đặc biệt"},bl:{food:"Túi rác thực phẩm",general:"Túi rác tiêu chuẩn",special:""}
     slogan:"Hướng dẫn phân loại rác sinh hoạt",highlight:"Chỉ cần tìm kiếm một lần để nhận hướng dẫn nhanh chóng.",quick1Title:"Môi trường",quick1Sub:"Thông tin môi trường",quick2Title:"Dịch vụ hành chính",quick2Sub:"Dịch vụ công",quick3Title:"Đa ngôn ngữ",quick3Sub:"5 ngôn ngữ",dongguTitle:"Trang web chính thức quận Dong-gu, Busan",dongguSub:"Hướng dẫn phân loại rác thực phẩm →"},
  sg:["vỏ trứng","xương cá","kimchi","vỏ chuối","xương gà","bã cà phê","bánh mì","dưa hấu","dầu ăn","tương ớt","cơm thừa","bắp cải"],
  db:[
    {t:["vo hanh","vỏ hành","re hanh","rễ hành","vo toi","vỏ tỏi","re toi","rễ tỏi","hanh","hành","toi","tỏi"],c:"general",d:"Vỏ & rễ hành tây, tỏi",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)","Rễ và vỏ cứng không được cho vào thùng rác thực phẩm"]},
    {t:["vo bap","vỏ bắp","ray bap","râu bắp","bap","bắp","ngo","ngô"],c:"general",d:"Vỏ bắp & râu bắp",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["vo dua","vỏ dừa","vo thom","vỏ thơm","vo khom","vỏ khóm","dua","dừa","thom","thơm"],c:"general",d:"Vỏ dứa (khóm) & vỏ dừa",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["vo hat","vỏ hạt","vo oc cho","vỏ óc chó","vo lac","vỏ lạc","vo dau phong","vỏ đậu phộng","oc cho","óc chó","lac","lạc"],c:"general",d:"Vỏ hạt cứng (óc chó, hạt dẻ, lạc...)",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["vo trung","vỏ trứng","vo trung ga","vỏ trứng gà","vo trung cut","vỏ trứng cút"],c:"general",d:"Vỏ trứng gà, trứng cút",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)","Lòng trứng (bên trong) → Túi rác thực phẩm"]},
    {t:["tui loc tra","túi lọc trà","tra tui","trà túi"],c:"general",d:"Túi lọc trà đã dùng",s:["Để túi trà khô trước","Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["ba ca phe","bã cà phê","ca phe","cà phê"],c:"general",d:"Bã cà phê (đã sấy khô)",s:["Để bã cà phê khô hoàn toàn","Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["thuc an thu cung","thức ăn thú cưng","hat cho meo","hạt chó mèo","thuc an cho","thức ăn chó","thuc an meo","thức ăn mèo"],c:"general",d:"Thức ăn khô cho chó/mèo",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["xuong lon","xương lợn","xuong bo","xương bò","xuong ga","xương gà","xuong","xương"],c:"general",d:"Xương lớn (lợn, bò, gà)",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)","Thịt mềm nhỏ & mỡ → Túi rác thực phẩm"]},
    {t:["vo so","vỏ sò","vo ngheu","vỏ nghêu","vo hau","vỏ hàu","vo tom","vỏ tôm","vo cua","vỏ cua","ngheu","nghêu","hau","hàu"],c:"general",d:"Vỏ động vật có vỏ (nghêu, hàu, cua, tôm...)",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["xuong ca","xương cá","vay ca","vây cá","fishbone"],c:"general",d:"Xương cá & vây cá sắc nhọn",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)","Nội tạng & thịt cá mềm → Túi rác thực phẩm"]},
    {t:["mi goi","mì gói","mi an lien","mì ăn liền","ramen"],c:"general",d:"Mì gói chưa nấu / hết hạn",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["hat ot","hạt ớt","cuong ot","cuống ớt","re hanh la","rễ hành lá","re can nuoc","rễ rau cần","than bap","thân bắp","vo trau","vỏ trấu","vo dau ha lan","vỏ đậu hà lan","qua dau ha lan","quả đậu hà lan","vo dau","vỏ đậu"],c:"general",d:"Vỏ, cuống và phần xơ cứng khó tiêu hóa đối với động vật",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)","Quá cứng hoặc nhiều chất xơ nên không được xử lý như rác thực phẩm"]},
    {t:["hat dao","hạt đào","hat xoai","hạt xoài","hat anh dao","hạt anh đào","hat nho","hạt nho","hat dua hau","hạt dưa hấu"],c:"general",d:"Hạt cứng (đào, xoài, anh đào, nho...)",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["thuoc bac","thuốc bắc","duoc lieu","dược liệu","ba thuoc","bã thuốc"],c:"general",d:"Bã thuốc đông y (khô)",s:["Bỏ vào Túi rác tiêu chuẩn (종량제봉투)"]},
    {t:["vo tao","vỏ táo","vo le","vỏ lê","vo chuoi","vỏ chuối","chuoi","chuối","vo dua hau","vỏ dưa hấu","dua hau","dưa hấu","vo cam","vỏ cam","vo chanh","vỏ chanh","vo quit","vỏ quýt"],c:"food",d:"Vỏ trái cây (táo, lê, chuối, dưa hấu, cam, chanh...)",s:["Vắt bỏ nước thừa","Cắt nhỏ các miếng lớn (vd: vỏ dưa hấu)","Loại bỏ tăm, dây chun","Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["cuong dau tay","cuống dâu tây","dau tay","dâu tây"],c:"food",d:"Cuống dâu tây",s:["Vắt bỏ nước thừa","Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["xoai say","xoài sấy","trai cay say mem","trái cây sấy mềm"],c:"food",d:"Trái cây sấy mềm (xoài sấy...)",s:["Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["bap cai","bắp cải","cu cai","củ cải","kimchi","kim chi"],c:"food",d:"Bắp cải, củ cải & vụn kimchi",s:["Vắt bỏ nước thừa — rác ẩm nặng hơn và gây mùi","Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["ngon hanh","ngọn hành","than hanh","thân hành","rau cu mem","rau củ mềm"],c:"food",d:"Ngọn hành lá & phần mềm của rau củ",s:["Rễ và vỏ → Túi rác tiêu chuẩn","Phần mềm: vắt nước rồi bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["long trung","lòng trứng","long do","lòng đỏ","long trang","lòng trắng","trung","trứng"],c:"food",d:"Lòng trứng (lòng đỏ & lòng trắng)",s:["Vỏ trứng → Túi rác tiêu chuẩn","Chỉ phần bên trong → Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["do an thua","đồ ăn thừa","com thua","cơm thừa","canh thua","canh thừa","do an hong","đồ ăn hỏng","an thua","an thừa"],c:"food",d:"Đồ ăn thừa / hỏng / hết hạn",s:["Đổ bỏ hết nước trước","Vắt bỏ nước thừa tối đa","Loại bỏ vật lạ (tăm, bao bì)","Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["tuong ot","tương ớt","tuong den","tương đen","doenjang","gochujang","ssamjang"],c:"food",d:"Tương lên men (doenjang, gochujang, ssamjang)",s:["Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["nuoc tuong","nước tương","rau muoi","rau muối","dua muoi","dưa muối","gia vi len men","gia vị lên men"],c:"food",d:"Nước tương, gia vị lên men & rau củ muối",s:["Đổ bỏ phần nước trước","Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["banh mi","bánh mì","banh ngot","bánh ngọt","banh","bánh"],c:"food",d:"Bánh mì & bánh nướng mềm",s:["Đổ bỏ nước nếu có","Bỏ vào Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["mo cat tia","mỡ cắt tỉa","thit song","thịt sống","manh thit","mảnh thịt","mo thit","mỡ thịt"],c:"food",d:"Mỡ cắt tỉa & vụn thịt sống",s:["Xương lớn → Túi rác tiêu chuẩn","Miếng nhỏ mềm & mỡ → Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["noi tang ca","nội tạng cá","ruot ca","ruột cá","thit ca","thịt cá"],c:"food",d:"Nội tạng cá & thịt cá mềm",s:["Xương cá & vây sắc → Túi rác tiêu chuẩn","Phần mềm → Túi rác thực phẩm (음식물쓰레기 전용용기)"]},
    {t:["dau an","dầu ăn","dau chien","dầu chiên"],c:"special",d:"Dầu ăn đã qua sử dụng",s:["Lượng nhỏ: thấm bằng giấy báo rồi bỏ vào Túi rác tiêu chuẩn","Lượng lớn: liên hệ công ty xử lý chất thải chuyên nghiệp","Thùng thu gom: mang đến thùng dầu thải chuyên dụng (hỏi BQL chung cư)"]},
    {t:["gạo","gạo cũ","gạo để lâu","gạo sống","gạo trắng","gạo lứt"],c:"food",d:"Gạo,gạo để lâu,gạo sống,gạo trắng,gạo lứt",s:["Bỏ vào thùng đựng rác thực phẩm."]},
    {t:["khoai tây","khoai tây mọc mầm","khoai lang","khoai lang hỏng"],c:"food",d:"Khoai tây,khoai tây mọc mầm,khoai lang,khoai lang hỏng",s:["Bỏ vào túi đựng rác thực phẩm."]}
  ]
},

ru:{name:"Русский",norm:nRu,
  ui:{h1:"Пищевые отходы? <span>Общий мусор?</span> Куда выбросить?",sub:"Введите название отходов и узнайте, как правильно их утилизировать.",
    slb:"Поиск по названию",ph:"Например: арбуз, яичная скорлупа, лампа",btn:"Поиск",
  clbl:"Часто ищут",empty:"Введите название отходов для поиска.",nf:q=>`По запросу "${q}" ничего не найдено.`,how:"Способ утилизации",fine:"Нарушение правил вывоза отходов может привести к штрафу до 1 000 000 вон.",
      tl:{food:"Пищевые отходы",general:"Общий мусор",special:"Специальная утилизация"},bl:{food:"Пакет для пищевых отходов",general:"Платный пакет",special:""},
      slogan:"Руководство по утилизации бытовых отходов",highlight:"Найдите нужную информацию всего за один поиск.",quick1Title:"Окружающая среда",quick1Sub:"Экологическая информация",quick2Title:"Госуслуги",quick2Sub:"Услуги для жителей",quick3Title:"Языки",quick3Sub:"5 языков",dongguTitle:"Официальный сайт района Тонгу, Пусан",dongguSub:"Руководство по утилизации пищевых отходов →",call:"Контакты",schedule:"График вывоза отходов"},
  sg:[  "яичная скорлупа",  "рыбная кость",  "кофейная гуща",  "куриная кость",  "ракушка",  "луковая шелуха",  "чайный пакетик",  "кожура ананаса"],
  db:[
{t:["корень лука","луковая шелуха","шелуха чеснока","корень чеснока","корень зелёного лука"],c:"general",d:"Корни и шелуха лука, чеснока и зелёного лука",s:["Выбрасывать в платный пакет","Слишком жёсткие для пищевых отходов"]},

{t:["кукурузная шелуха","кукурузные рыльца","стебель кукурузы"],c:"general",d:"Шелуха, стебли и рыльца кукурузы",s:["Выбрасывать в платный пакет"]},

{t:["кожура ананаса","ананас","кокос","кожура кокоса"],c:"general",d:"Кожура ананаса и кокоса",s:["Выбрасывать в платный пакет"]},

{t:["скорлупа грецкого ореха","скорлупа каштана","скорлупа арахиса","скорлупа желудя","ореховая скорлупа"],c:"general",d:"Скорлупа орехов",s:["Выбрасывать в платный пакет"]},

{t:["яичная скорлупа","скорлупа яйца","скорлупа перепелиного яйца"],c:"general",d:"Яичная скорлупа",s:["Выбрасывать в платный пакет"]},

{t:["чайный пакетик","использованный чайный пакетик","зелёный чай"],c:"general",d:"Использованные чайные пакетики",s:["Высушить и выбросить в платный пакет"]},

{t:["кофейная гуща","молотый кофе","остатки кофе"],c:"general",d:"Кофейная гуща",s:["Высушить и выбросить в платный пакет"]},

{t:["корм для собак","корм для кошек","сухой корм","корм"],c:"general",d:"Сухой корм для животных",s:["Выбрасывать в платный пакет"]},

{t:["свиная кость","говяжья кость","куриная кость","кость","большая кость"],c:"general",d:"Крупные кости животных",s:["Выбрасывать в платный пакет"]},

{t:["ракушка","устричная раковина","раковина моллюска","панцирь креветки","панцирь краба","мидии"],c:"general",d:"Раковины моллюсков и панцири",s:["Выбрасывать в платный пакет"]},

{t:["рыбная кость","кости рыбы","рыбьи кости","острый плавник"],c:"general",d:"Рыбные кости и плавники",s:["Выбрасывать в платный пакет"]},

{t:["просроченная лапша","сухая лапша","рамён","лапша быстрого приготовления"],c:"general",d:"Сухая просроченная лапша",s:["Выбрасывать в платный пакет"]},

{t:["персиковая косточка","косточка манго","манговая косточка","вишнёвая косточка","виноградная косточка","семена фруктов"],c:"general",d:"Твёрдые фруктовые косточки",s:["Выбрасывать в платный пакет"]},

{t:["лекарственные травы","остатки трав","сухие травы"],c:"general",d:"Остатки лекарственных трав",s:["Выбрасывать в платный пакет"]},

{t:["семена перца","стебель перца","шелуха гороха","стручок гороха","фасолевая шелуха"],c:"general",d:"Жёсткие растительные отходы",s:["Выбрасывать в платный пакет"]},

{t:["кожура яблока","яблочная кожура","кожура груши","арбузная корка","арбуз","банановая кожура","банан","кожура мандарина","кожура апельсина","кожура лимона","кожура дыни"],c:"food",d:"Фруктовые очистки",s:["Удалить лишнюю влагу","Крупные куски измельчить","Выбросить в пакет для пищевых отходов"]},

{t:["клубника","хвостик клубники"],c:"food",d:"Хвостики клубники",s:["Выбросить в пакет для пищевых отходов"]},

{t:["сушёное манго","мягкие сухофрукты","сухофрукты"],c:"food",d:"Мягкие сухофрукты",s:["Выбросить в пакет для пищевых отходов"]},

{t:["капуста","редька","кимчи","редька кимчи"],c:"food",d:"Капуста, редька и кимчи",s:["Удалить влагу","Выбросить в пакет для пищевых отходов"]},

{t:["листья лука","зелёный лук","лук-порей","овощные обрезки","овощи"],c:"food",d:"Мягкие части овощей",s:["Удалить влагу","Выбросить в пакет для пищевых отходов"]},

{t:["яичный белок","яичный желток","содержимое яйца"],c:"food",d:"Содержимое яйца",s:["Только содержимое относится к пищевым отходам"]},

{t:["остатки еды","рис","суп","рагу","гарнир","испорченная еда"],c:"food",d:"Остатки приготовленной пищи",s:["Слить жидкость","Удалить посторонние предметы","Выбросить в пакет для пищевых отходов"]},

{t:["паста из соевых бобов","кочуджан","самджан"],c:"food",d:"Ферментированные пасты",s:["Выбросить в пакет для пищевых отходов"]},

{t:["соевый соус","солёные морепродукты","маринованные овощи"],c:"food",d:"Соевый соус и маринованные продукты",s:["Слить жидкость","Выбросить в пакет для пищевых отходов"]},

{t:["хлеб","батон","выпечка","кекс","торт"],c:"food",d:"Хлеб и выпечка",s:["Выбросить в пакет для пищевых отходов"]},

{t:["жир","сырой фарш","обрезки мяса","мясо"],c:"food",d:"Мясные обрезки и жир",s:["Кости выбрасывать отдельно","Мягкие части — в пищевые отходы"]},

{t:["рыбные внутренности","рыбное филе","мягкая рыба"],c:"food",d:"Внутренности и мягкие части рыбы",s:["Кости выбрасывать отдельно","Мягкие части — в пищевые отходы"]},

{t:["отработанное масло","растительное масло","кухонное масло"],c:"special",d:"Отработанное пищевое масло",s:["Небольшое количество впитать бумагой","Большое количество сдавать в пункт сбора"]},
{t:["рис","старый рис","лежалый рис","сырой рис","белый рис","бурый рис"],c:"food",d:"Рис,старый рис,лежалый рис,сырой рис,белый рис,бурый рис",s:["Выбрасывать в контейнер для пищевых отходов."]},
{t:["картофель","проросший картофель","батат","испорченный батат"],c:"food",d:"Картофель,проросший картофель,батат,испорченный батат",s:["Выбрасывать в пакет для пищевых отходов."]}    
]
   }
};
