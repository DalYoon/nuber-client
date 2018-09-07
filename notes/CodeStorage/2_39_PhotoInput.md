## Component/PhotoInput/index.tsx

```typescript
import PhotoInput from "./PhotoInput";

export default PhotoInput;
```

## Component/PhotoInput/PhotoInput.tsx

```typescript
import React from "react";
import styled from "../../typed-components";

const Container = styled.div``;

const Image = styled.label`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border: 2px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  uploading: boolean;
  uploaded: boolean;
  fileUrl: string;
}
const PhotoInput: React.SFC<IProps> = ({ uploading, uploaded, fileUrl }) => (
  <Container>
    <Input id={"photo"} type="file" accept="image/*" />
    <Image htmlFor="photo">
      {!uploading && !uploaded && "➕"}
      {uploading && !uploaded && "⏰"}
      {!uploading && uploaded && <img src={fileUrl} />}
    </Image>
  </Container>
);
export default PhotoInput;
```
