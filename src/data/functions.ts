import { ExcelFunction } from '../types';

export const excelFunctions: ExcelFunction[] = [
  {
    id: 'sum',
    name: 'SUM',
    category: '数学与三角函数',
    description: '计算一组数值的总和。这是Excel中最常用的函数之一。',
    syntax: 'SUM(number1, [number2], ...)',
    parameters: [
      { name: 'number1', type: '必需', required: true, description: '要相加的第一个数字、单元格引用或范围' },
      { name: 'number2', type: '可选', required: false, description: '要相加的第二个数字、单元格引用或范围' },
    ],
    examples: [
      {
        description: '计算几个数字的总和',
        formula: '=SUM(10, 20, 30)',
        result: 60,
        explanation: '将10、20和30相加，结果为60'
      },
      {
        description: '计算单元格范围的总和',
        formula: '=SUM(A1:A5)',
        result: 'A1到A5单元格的总和',
        explanation: '计算A1到A5单元格中所有数字的总和'
      },
      {
        description: '计算多个范围的总和',
        formula: '=SUM(A1:A3, B1:B3)',
        result: '两个范围的总和',
        explanation: '先计算A1:A3的总和，再计算B1:B3的总和，最后将两个结果相加'
      }
    ],
    tips: [
      'SUM函数会自动忽略文本和空单元格',
      '可以使用SUM(A:A)计算整列的总和',
      'SUM函数最多可以包含255个参数'
    ]
  },
  {
    id: 'average',
    name: 'AVERAGE',
    category: '统计函数',
    description: '计算一组数值的平均值（算术平均值）。',
    syntax: 'AVERAGE(number1, [number2], ...)',
    parameters: [
      { name: 'number1', type: '必需', required: true, description: '要计算平均值的第一个数字、单元格引用或范围' },
      { name: 'number2', type: '可选', required: false, description: '要计算平均值的其他数字、单元格引用或范围' },
    ],
    examples: [
      {
        description: '计算几个数字的平均值',
        formula: '=AVERAGE(10, 20, 30, 40)',
        result: 25,
        explanation: '将10、20、30、40相加得到100，然后除以4，结果为25'
      },
      {
        description: '计算单元格范围的平均值',
        formula: '=AVERAGE(B2:B10)',
        result: 'B2到B10的平均值',
        explanation: '计算B2到B10单元格中所有数字的平均值'
      }
    ],
    tips: [
      'AVERAGE函数会自动忽略文本和空单元格',
      '如果所有参数都是文本，AVERAGE返回#DIV/0!错误',
      '可以使用AVERAGEIF和AVERAGEIFS进行条件平均'
    ]
  },
  {
    id: 'if',
    name: 'IF',
    category: '逻辑函数',
    description: '根据条件判断返回不同的值。这是Excel中最强大的函数之一。',
    syntax: 'IF(logical_test, value_if_true, value_if_false)',
    parameters: [
      { name: 'logical_test', type: '必需', required: true, description: '要测试的条件（逻辑表达式）' },
      { name: 'value_if_true', type: '必需', required: true, description: '条件为真时返回的值' },
      { name: 'value_if_false', type: '必需', required: true, description: '条件为假时返回的值' },
    ],
    examples: [
      {
        description: '简单的条件判断',
        formula: '=IF(A1>60, "及格", "不及格")',
        result: '如果A1>60返回"及格"，否则返回"不及格"',
        explanation: '检查A1单元格的值是否大于60，如果是则显示"及格"，否则显示"不及格"'
      },
      {
        description: '嵌套IF函数',
        formula: '=IF(A1>=90, "优秀", IF(A1>=80, "良好", "一般"))',
        result: '根据分数返回不同等级',
        explanation: '如果A1>=90返回"优秀"，否则如果A1>=80返回"良好"，否则返回"一般"'
      },
      {
        description: 'IF函数计算',
        formula: '=IF(B2>C2, B2*0.1, C2*0.05)',
        result: '根据条件返回不同的计算结果',
        explanation: '如果B2大于C2，返回B2的10%，否则返回C2的5%'
      }
    ],
    tips: [
      'IF函数可以嵌套最多64层',
      '可以使用AND、OR函数组合多个条件',
      'IFS函数可以替代多个嵌套的IF函数（Excel 2016+）'
    ]
  },
  {
    id: 'vlookup',
    name: 'VLOOKUP',
    category: '查找与引用函数',
    description: '在表格或区域的第一列中查找值，然后返回同一行中指定列的值。',
    syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    parameters: [
      { name: 'lookup_value', type: '必需', required: true, description: '要在第一列中查找的值' },
      { name: 'table_array', type: '必需', required: true, description: '包含数据的单元格范围' },
      { name: 'col_index_num', type: '必需', required: true, description: '要返回值的列号（从1开始）' },
      { name: 'range_lookup', type: '可选', required: false, description: 'TRUE（近似匹配）或FALSE（精确匹配）' },
    ],
    examples: [
      {
        description: '精确查找',
        formula: '=VLOOKUP("苹果", A2:B10, 2, FALSE)',
        result: '返回"苹果"对应的价格',
        explanation: '在A2:A10中查找"苹果"，找到后返回B列（第2列）对应的值'
      },
      {
        description: '使用单元格引用',
        formula: '=VLOOKUP(D2, A2:C10, 3, FALSE)',
        result: '根据D2的值查找并返回第3列的值',
        explanation: '在A2:A10中查找D2单元格的值，找到后返回C列（第3列）的值'
      }
    ],
    tips: [
      'VLOOKUP只能从左向右查找',
      '如果找不到精确匹配且range_lookup为TRUE，会返回小于查找值的最大值',
      '查找值必须在table_array的第一列',
      'XLOOKUP函数（Excel 365）功能更强大，可以双向查找'
    ]
  },
  {
    id: 'count',
    name: 'COUNT',
    category: '统计函数',
    description: '计算包含数字的单元格数量。',
    syntax: 'COUNT(value1, [value2], ...)',
    parameters: [
      { name: 'value1', type: '必需', required: true, description: '要计数的第一个项目' },
      { name: 'value2', type: '可选', required: false, description: '要计数的其他项目' },
    ],
    examples: [
      {
        description: '计算数字单元格数量',
        formula: '=COUNT(A1:A10)',
        result: 'A1:A10中包含数字的单元格数量',
        explanation: '统计A1到A10范围内包含数字的单元格个数，忽略文本和空单元格'
      },
      {
        description: '计算多个范围',
        formula: '=COUNT(A1:A5, B1:B5)',
        result: '两个范围中数字单元格的总数',
        explanation: '分别统计两个范围中的数字单元格，然后相加'
      }
    ],
    tips: [
      'COUNT只计算数字，不计算文本',
      '使用COUNTA可以计算所有非空单元格',
      '使用COUNTIF可以进行条件计数'
    ]
  },
  {
    id: 'max',
    name: 'MAX',
    category: '数学与三角函数',
    description: '返回一组数值中的最大值。',
    syntax: 'MAX(number1, [number2], ...)',
    parameters: [
      { name: 'number1', type: '必需', required: true, description: '要比较的第一个数字' },
      { name: 'number2', type: '可选', required: false, description: '要比较的其他数字' },
    ],
    examples: [
      {
        description: '查找最大值',
        formula: '=MAX(10, 25, 5, 30)',
        result: 30,
        explanation: '从10、25、5、30中找出最大值，结果为30'
      },
      {
        description: '查找范围中的最大值',
        formula: '=MAX(A1:A20)',
        result: 'A1:A20中的最大值',
        explanation: '找出A1到A20单元格中的最大数值'
      }
    ],
    tips: [
      'MAX函数会忽略文本和逻辑值',
      '使用MAXIFS可以进行条件最大值查找（Excel 2016+）',
      'MIN函数用于查找最小值'
    ]
  },
  {
    id: 'min',
    name: 'MIN',
    category: '数学与三角函数',
    description: '返回一组数值中的最小值。',
    syntax: 'MIN(number1, [number2], ...)',
    parameters: [
      { name: 'number1', type: '必需', required: true, description: '要比较的第一个数字' },
      { name: 'number2', type: '可选', required: false, description: '要比较的其他数字' },
    ],
    examples: [
      {
        description: '查找最小值',
        formula: '=MIN(10, 25, 5, 30)',
        result: 5,
        explanation: '从10、25、5、30中找出最小值，结果为5'
      },
      {
        description: '查找范围中的最小值',
        formula: '=MIN(B2:B15)',
        result: 'B2:B15中的最小值',
        explanation: '找出B2到B15单元格中的最小数值'
      }
    ],
    tips: [
      'MIN函数会忽略文本和逻辑值',
      '使用MINIFS可以进行条件最小值查找（Excel 2016+）',
      'MAX函数用于查找最大值'
    ]
  },
  {
    id: 'countif',
    name: 'COUNTIF',
    category: '统计函数',
    description: '计算满足指定条件的单元格数量。',
    syntax: 'COUNTIF(range, criteria)',
    parameters: [
      { name: 'range', type: '必需', required: true, description: '要计数的单元格范围' },
      { name: 'criteria', type: '必需', required: true, description: '定义哪些单元格将被计数的条件' },
    ],
    examples: [
      {
        description: '计算等于某个值的单元格',
        formula: '=COUNTIF(A1:A10, "苹果")',
        result: 'A1:A10中等于"苹果"的单元格数量',
        explanation: '统计A1到A10范围内等于"苹果"的单元格个数'
      },
      {
        description: '计算大于某个值的单元格',
        formula: '=COUNTIF(B1:B20, ">60")',
        result: 'B1:B20中大于60的单元格数量',
        explanation: '统计B1到B20范围内大于60的单元格个数'
      },
      {
        description: '使用通配符',
        formula: '=COUNTIF(C1:C10, "张*")',
        result: 'C1:C10中以"张"开头的单元格数量',
        explanation: '使用通配符*匹配以"张"开头的所有文本'
      }
    ],
    tips: [
      '条件可以使用比较运算符：>, <, >=, <=, <>',
      '可以使用通配符：*（任意字符）和?（单个字符）',
      'COUNTIFS可以进行多条件计数'
    ]
  },
  {
    id: 'sumif',
    name: 'SUMIF',
    category: '数学与三角函数',
    description: '对满足指定条件的单元格求和。',
    syntax: 'SUMIF(range, criteria, [sum_range])',
    parameters: [
      { name: 'range', type: '必需', required: true, description: '要应用条件的单元格范围' },
      { name: 'criteria', type: '必需', required: true, description: '定义哪些单元格将被求和的条件' },
      { name: 'sum_range', type: '可选', required: false, description: '要求和的实际单元格范围（如果省略，则对range求和）' },
    ],
    examples: [
      {
        description: '条件求和',
        formula: '=SUMIF(A1:A10, ">100", B1:B10)',
        result: 'A列大于100时，对应B列的总和',
        explanation: '检查A1:A10，如果值大于100，则将对应的B列值相加'
      },
      {
        description: '文本条件求和',
        formula: '=SUMIF(C1:C10, "销售", D1:D10)',
        result: 'C列为"销售"时，对应D列的总和',
        explanation: '检查C1:C10，如果等于"销售"，则将对应的D列值相加'
      }
    ],
    tips: [
      '如果省略sum_range，则对range本身求和',
      '可以使用SUMIFS进行多条件求和',
      '条件支持通配符和比较运算符'
    ]
  },
  {
    id: 'concatenate',
    name: 'CONCATENATE',
    category: '文本函数',
    description: '将两个或多个文本字符串连接成一个字符串。',
    syntax: 'CONCATENATE(text1, [text2], ...)',
    parameters: [
      { name: 'text1', type: '必需', required: true, description: '要连接的第一个文本项' },
      { name: 'text2', type: '可选', required: false, description: '要连接的其他文本项' },
    ],
    examples: [
      {
        description: '连接文本',
        formula: '=CONCATENATE("Hello", " ", "World")',
        result: 'Hello World',
        explanation: '将三个文本项连接成一个字符串'
      },
      {
        description: '连接单元格',
        formula: '=CONCATENATE(A1, " - ", B1)',
        result: 'A1和B1的内容用" - "连接',
        explanation: '将A1和B1的内容用" - "连接起来'
      }
    ],
    tips: [
      '可以使用&运算符代替CONCATENATE函数，更简洁',
      '例如：=A1&" - "&B1 等同于 =CONCATENATE(A1, " - ", B1)',
      'CONCAT函数（Excel 2016+）功能类似，但更灵活'
    ]
  }
];

export const categories = [
  { id: 'all', name: '全部', icon: '📚', color: '#6366f1' },
  { id: '数学与三角函数', name: '数学与三角函数', icon: '🔢', color: '#3b82f6' },
  { id: '统计函数', name: '统计函数', icon: '📊', color: '#10b981' },
  { id: '逻辑函数', name: '逻辑函数', icon: '🔀', color: '#f59e0b' },
  { id: '查找与引用函数', name: '查找与引用', icon: '🔍', color: '#8b5cf6' },
  { id: '文本函数', name: '文本函数', icon: '📝', color: '#ec4899' },
];
