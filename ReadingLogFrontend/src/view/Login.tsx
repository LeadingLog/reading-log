export default function Login() {
  return (
    <section
      className="absolute flex flex-col gap-[85px] justify-center items-center w-[1325px] left-1/2 transform -translate-x-1/2 top-[10%] bottom-[10%] bg-book_Bg rounded-lg">
      <p className="text-white text-[40px]">My Reading LOG</p>
      <div className="text-white text-[40px]">로고 자리</div>
      <article className="flex flex-col gap-[20px]">
        <button className="bg-social_Bg text-[40px] w-[500px] h-[85px] rounded-xl">
          카카오 이미지
        </button>
        <button className="bg-social_Bg  text-[40px] w-[500px] h-[85px] rounded-lg">
          네이버 이미지
        </button>
      </article>
    </section>
  );
}
