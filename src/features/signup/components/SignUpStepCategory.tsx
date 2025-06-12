export default function SignUpStepCategory() {
  const categories = [
    '경제',
    '정치',
    '사회',
    '문화',
    '연예',
    '스포츠',
    '교육',
    '기술'
  ];

  return (
    <>
      <h3>관심있는 분야를 선택해주세요</h3>
      <p>최대 3개까지 선택할 수 있어요</p>
      <div className="flex gap-2">
        {categories.map((category) => (
          <div key={category} className="rounded-20 w-20 h-10 border border-gray-300 flex items-center justify-center">{category}</div>
        ))}
      </div>
    </>
  );
}