import Image from "next/image";

const PropertiesPanel = ({
  handleEdit,
  handleComment,
}: {
  handleEdit: () => void;
  handleComment: () => void;
}) => {
  return (
    <div
      className={`mt-8 mr-4 flex h-50 w-28 flex-col justify-between gap-2 rounded-md border-2 border-gray-200 px-2 py-2`}
    >
      <button
        className="flex h-24 cursor-pointer flex-col items-center justify-around rounded-md border border-blue-900"
        onClick={() => handleEdit()}
      >
        <Image
          src="/icons/edit.svg"
          alt="testing svg images"
          width={35}
          height={35}
        />
        <span>Edit</span>
      </button>
      <button
        className="flex h-24 cursor-pointer flex-col items-center justify-around rounded-md border border-blue-900 px-6 py-2 pt-2"
        onClick={() => handleComment()}
      >
        <Image
          src="/icons/message.svg"
          alt="testing svg images"
          width={20}
          height={20}
        />
        <span>Comments</span>
      </button>
    </div>
  );
};

export default PropertiesPanel;
